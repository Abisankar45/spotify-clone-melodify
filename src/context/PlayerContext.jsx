import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg   = useRef();

  const [track,      setTrack]      = useState(songsData[4]);
  const [playStatus, setPlayStatus] = useState(false);
  const [volume,     setVolume]     = useState(0.7);
  const [isMuted,    setIsMuted]    = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none"); // "none" | "all" | "one"
  const [isLiked,    setIsLiked]    = useState(false);

  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime:   { second: 0, minute: 0 },
  });

  // refs so the "ended" handler never goes stale
  const trackRef   = useRef(track);
  const shuffleRef = useRef(isShuffled);
  const repeatRef  = useRef(repeatMode);
  useEffect(() => { trackRef.current   = track;      }, [track]);
  useEffect(() => { shuffleRef.current = isShuffled; }, [isShuffled]);
  useEffect(() => { repeatRef.current  = repeatMode; }, [repeatMode]);

  // Auto-play on track change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
    setPlayStatus(true);
    setIsLiked(false);
  }, [track]);

  // Live time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (!audio.duration) return;
      setTime({
        currentTime: {
          minute: Math.floor(audio.currentTime / 60),
          second: Math.floor(audio.currentTime % 60),
        },
        totalTime: {
          minute: Math.floor(audio.duration / 60),
          second: Math.floor(audio.duration % 60),
        },
      });
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, []);

  // Volume / mute
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Auto-next — single listener, reads from refs (no stale closure bug)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      const repeat  = repeatRef.current;
      const shuffle = shuffleRef.current;
      const cur     = trackRef.current;

      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      if (shuffle) {
        let id;
        do { id = Math.floor(Math.random() * songsData.length); }
        while (id === cur.id && songsData.length > 1);
        setTrack(songsData[id]);
        return;
      }
      if (cur.id < songsData.length - 1) {
        setTrack(songsData[cur.id + 1]);
      } else if (repeat === "all") {
        setTrack(songsData[0]);
      } else {
        setPlayStatus(false);
      }
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []); // runs once; reads live state via refs

  const play  = async () => {
    try { await audioRef.current.play(); setPlayStatus(true); }
    catch (err) { console.log(err); }
  };
  const pause = () => { audioRef.current.pause(); setPlayStatus(false); };

  const playWithId = useCallback((id) => setTrack(songsData[id]), []);

  // Pressing prev within first 3 s restarts track (Spotify behaviour)
  const before = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) { audio.currentTime = 0; return; }
    setTrack((t) => t.id > 0 ? songsData[t.id - 1] : songsData[songsData.length - 1]);
  }, []);

  const after = useCallback(() => {
    if (shuffleRef.current) {
      let id;
      do { id = Math.floor(Math.random() * songsData.length); }
      while (id === trackRef.current.id && songsData.length > 1);
      setTrack(songsData[id]);
    } else {
      setTrack((t) => t.id < songsData.length - 1 ? songsData[t.id + 1] : songsData[0]);
    }
  }, []);

  const seekBgClick = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = seekBg.current.getBoundingClientRect();
    let pct    = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, pct)) * audio.duration;
  }, []);

  const toggleMute    = useCallback(() => setIsMuted((m) => !m), []);
  const toggleShuffle = useCallback(() => setIsShuffled((s) => !s), []);
  const toggleRepeat  = useCallback(() =>
    setRepeatMode((r) => r === "none" ? "all" : r === "all" ? "one" : "none"), []);
  const toggleLike    = useCallback(() => setIsLiked((l) => !l), []);

  return (
    <PlayerContext.Provider value={{
      audioRef, seekBg,
      track, playStatus, time,
      volume, isMuted, isShuffled, repeatMode, isLiked,
      setVolume,
      play, pause, playWithId, before, after, seekBgClick,
      toggleMute, toggleShuffle, toggleRepeat, toggleLike,
    }}>
      {props.children}
      <audio
        ref={audioRef}
        src={track.file}
        onLoadedMetadata={() => {
          if (!audioRef.current) return;
          setTime((prev) => ({
            ...prev,
            totalTime: {
              minute: Math.floor(audioRef.current.duration / 60),
              second: Math.floor(audioRef.current.duration % 60),
            },
          }));
        }}
      />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;