import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

// ── helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) => String(n ?? 0).padStart(2, "0");

// ── inline SVG icons (no extra deps) ─────────────────────────────────────────
const Ico = {
  Shuffle: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356A2.25 2.25 0 0 1 11.16 4.5h1.949l-1.011 1.013a.75.75 0 1 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.177.471 2.873 1.34L4.89 5.277l-.979 1.167-1.353-1.61A2.25 2.25 0 0 0 .39 3.5z" />
      <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.96l-1.01-1.013a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.937z" />
    </svg>
  ),
  Prev: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" />
    </svg>
  ),
  Next: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" />
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
    </svg>
  ),
  Pause: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" />
    </svg>
  ),
  RepeatAll: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z" />
    </svg>
  ),
  RepeatOne: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM8.5 6.5a.5.5 0 0 0-1 0v3.25a.5.5 0 0 0 1 0V7.624l-.234.165a.5.5 0 0 0-.55-.832L8.5 6.5z" />
    </svg>
  ),
  HeartEmpty: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M1.69 2a4.582 4.582 0 0 1 6.825.955.75.75 0 0 0 1.16 0A4.584 4.584 0 0 1 15.107 7.1a4.518 4.518 0 0 1-1.348 3.211L8 15.881l-5.76-5.57A4.518 4.518 0 0 1 .893 7.1 4.579 4.579 0 0 1 1.69 2zM8 3.251a6.09 6.09 0 0 0-4.002-1.958 3.082 3.082 0 0 0-2.63 3.8 3.018 3.018 0 0 0 .9 2.144L8 13.625l5.732-6.387a3.02 3.02 0 0 0 .9-2.145 3.08 3.08 0 0 0-2.63-3.8A6.09 6.09 0 0 0 8 3.25z" />
    </svg>
  ),
  HeartFull: () => (
    <svg viewBox="0 0 16 16" fill="#1db954" className="w-full h-full">
      <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.75.75 0 0 1-1.14 0 4.27 4.27 0 0 0-3.623-1.13A4.313 4.313 0 0 0 .276 4.22c-.287 1.511.144 3.049 1.175 4.123l5.89 6.062a.75.75 0 0 0 1.08-.006l5.85-6.062a4.319 4.319 0 0 0 1.173-4.116z" />
    </svg>
  ),
  VolHigh: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.641 3.641 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8L2.817 6.15zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z" />
    </svg>
  ),
  VolLow: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.641 3.641 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8L2.817 6.15zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.48z" />
    </svg>
  ),
  VolMute: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z" />
      <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z" />
    </svg>
  ),
  Queue: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 0 0 0-2h-9z" />
    </svg>
  ),
  Device: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
      <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25H4V12H1.75A1.75 1.75 0 0 1 0 10.25v-7.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z" />
    </svg>
  ),
};

// ── small reusable icon button ─────────────────────────────────────────────────
const IBtn = ({ onClick, active = false, children, size = "w-4 h-4", label }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`relative flex items-center justify-center transition-transform duration-150
      hover:scale-105 active:scale-95
      ${active ? "text-[#1db954]" : "text-[#b3b3b3] hover:text-white"}`}
  >
    <span className={size}>{children}</span>
    {/* active dot — same as Spotify */}
    {active && (
      <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1db954]" />
    )}
  </button>
);

// ── volume icon selector ──────────────────────────────────────────────────────
const VolIcon = ({ volume, isMuted }) => {
  if (isMuted || volume === 0) return <Ico.VolMute />;
  if (volume < 0.5)            return <Ico.VolLow  />;
  return <Ico.VolHigh />;
};

// ── main ─────────────────────────────────────────────────────────────────────
const Player = () => {
  const {
    seekBg,
    play, pause, playStatus,
    track, time,
    before, after,
    seekBgClick,
    volume, isMuted, setVolume,
    isShuffled, repeatMode, isLiked,
    toggleMute, toggleShuffle, toggleRepeat, toggleLike,
  } = useContext(PlayerContext);

  // progress %
  const current  = time.currentTime.minute * 60 + time.currentTime.second;
  const total    = time.totalTime.minute   * 60 + time.totalTime.second;
  const progress = total ? (current / total) * 100 : 0;

  const handleVolumeBar = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setVolume(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  };

  return (
    <div className="h-[90px] bg-[#181818] border-t border-[#282828] flex items-center justify-between px-4 select-none z-50">

      {/* ── LEFT  — track info + like ─────────────────────────────────────── */}
      <div className="flex items-center gap-3 w-[30%] min-w-0">
        <img
          src={track.image}
          alt={track.name}
          className="w-14 h-14 rounded object-cover flex-shrink-0 shadow-lg"
        />
        <div className="flex flex-col min-w-0">
          <p className="text-white text-sm font-semibold truncate leading-tight hover:underline cursor-pointer">
            {track.name}
          </p>
          <p className="text-[#b3b3b3] text-xs truncate mt-0.5 hover:text-white hover:underline cursor-pointer">
            {track.desc?.slice(0, 28) ?? "Unknown Artist"}
          </p>
        </div>
        {/* Like */}
        <IBtn onClick={toggleLike} active={isLiked} label="Like" size="w-4 h-4">
          {isLiked ? <Ico.HeartFull /> : <Ico.HeartEmpty />}
        </IBtn>
      </div>

      {/* ── CENTER — controls + seek ──────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-2 w-[40%] max-w-[722px]">

        {/* control row */}
        <div className="flex items-center gap-5">
          {/* Shuffle */}
          <IBtn onClick={toggleShuffle} active={isShuffled} label="Shuffle" size="w-4 h-4">
            <Ico.Shuffle />
          </IBtn>

          {/* Prev */}
          <IBtn onClick={before} label="Previous" size="w-4 h-4">
            <Ico.Prev />
          </IBtn>

          {/* Play / Pause  — big white circle */}
          <button
            onClick={playStatus ? pause : play}
            aria-label={playStatus ? "Pause" : "Play"}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center
              text-black transition-transform duration-150 hover:scale-105 active:scale-95
              shadow-md hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
          >
            <span className="w-[14px] h-[14px]">
              {playStatus ? <Ico.Pause /> : <Ico.Play />}
            </span>
          </button>

          {/* Next */}
          <IBtn onClick={after} label="Next" size="w-4 h-4">
            <Ico.Next />
          </IBtn>

          {/* Repeat */}
          <IBtn
            onClick={toggleRepeat}
            active={repeatMode !== "none"}
            label="Repeat"
            size="w-4 h-4"
          >
            {repeatMode === "one" ? <Ico.RepeatOne /> : <Ico.RepeatAll />}
          </IBtn>
        </div>

        {/* seek row */}
        <div className="flex items-center gap-2 w-full">
          {/* current time */}
          <span className="text-[#b3b3b3] text-[11px] w-10 text-right tabular-nums">
            {fmt(time.currentTime.minute)}:{fmt(time.currentTime.second)}
          </span>

          {/* seek bar */}
          <div
            ref={seekBg}
            onClick={seekBgClick}
            className="group relative flex-1 h-1 rounded-full bg-[#4d4d4d] cursor-pointer"
          >
            {/* filled track */}
            <div
              style={{ width: `${progress}%` }}
              className="absolute top-0 left-0 h-full rounded-full bg-white
                group-hover:bg-[#1db954] transition-colors duration-150"
            />
            {/* thumb — only visible on hover */}
            <div
              style={{ left: `${progress}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                w-3 h-3 rounded-full bg-white shadow
                opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            />
            {/* hover height expansion */}
            <div className="absolute inset-0 rounded-full group-hover:scale-y-[1.6] transition-transform duration-150 pointer-events-none" />
          </div>

          {/* total time — FIX: use computed time, not track.duration string */}
          <span className="text-[#b3b3b3] text-[11px] w-10 tabular-nums">
            {fmt(time.totalTime.minute)}:{fmt(time.totalTime.second)}
          </span>
        </div>
      </div>

      {/* ── RIGHT — queue / device / volume ──────────────────────────────── */}
      <div className="hidden lg:flex items-center gap-3 w-[30%] justify-end">

        {/* Queue */}
        <IBtn label="Queue" size="w-4 h-4">
          <Ico.Queue />
        </IBtn>

        {/* Device */}
        <IBtn label="Connect to a device" size="w-4 h-4">
          <Ico.Device />
        </IBtn>

        {/* Volume icon — click to mute/unmute */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="text-[#b3b3b3] hover:text-white transition-colors w-4 h-4 flex-shrink-0"
        >
          <VolIcon volume={volume} isMuted={isMuted} />
        </button>

        {/* Volume bar */}
        <div
          onClick={handleVolumeBar}
          className="group relative w-[93px] h-1 rounded-full bg-[#4d4d4d] cursor-pointer"
        >
          <div
            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            className="h-full rounded-full bg-white group-hover:bg-[#1db954] transition-colors duration-150"
          />
          <div
            style={{ left: `${isMuted ? 0 : volume * 100}%` }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
              w-3 h-3 rounded-full bg-white shadow
              opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          />
        </div>
      </div>

    </div>
  );
};

export default Player;