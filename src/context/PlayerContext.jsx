import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[4]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: "--", minute: "--" },
        totalTime:   { second: "--", minute: "--" },
    });

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (!audio.duration || isNaN(audio.duration)) return;
            seekBar.current.style.width =
                ((audio.currentTime / audio.duration) * 100) + "%";
            setTime({
                currentTime: {
                    second: Math.floor(audio.currentTime % 60),
                    minute: Math.floor(audio.currentTime / 60),
                },
                totalTime: {
                    second: Math.floor(audio.duration % 60),
                    minute: Math.floor(audio.duration / 60),
                },
            });
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);

    const shouldAutoPlay = useRef(false);

    useEffect(() => {
        if (shouldAutoPlay.current && audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
            shouldAutoPlay.current = false;
        }
    }, [track]);

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = (id) => {
        setTrack(songsData[id]);
        shouldAutoPlay.current = true;
    };

    const before = () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1]);
            shouldAutoPlay.current = true;
        }
    };

    const after = () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1]);
            shouldAutoPlay.current = true;
        }
    };

    const seekBgClick = (e) => {
        audioRef.current.currentTime =
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    };

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        playStatus,
        time,
        setTrack,
        setPlayStatus,
        setTime,
        play,
        pause,
        playWithId,
        before,
        after,
        seekBgClick,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;