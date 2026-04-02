import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[4]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: "00",
            minute: "00",
        },
        totalTime: {
            second: "00",
            minute: "00",
        },
    });

    useEffect(() => {
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = () => {
                    // Check if duration is a valid number before updating
                    if (!isNaN(audioRef.current.duration)) {
                        seekBar.current.style.width = ((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%";
                        
                        setTime({
                            currentTime: {
                                second: Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0'),
                                minute: Math.floor(audioRef.current.currentTime / 60).toString().padStart(2, '0'),
                            },
                            totalTime: {
                                second: Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0'),
                                minute: Math.floor(audioRef.current.duration / 60).toString().padStart(2, '0'),
                            },
                        });
                    }
                };
            }
        }, 1000);
    }, [audioRef, track]); // Added track to dependency to ensure update on song change

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const before = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const after = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const seekBgClick = async (e) => {
        if (audioRef.current.duration) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    }

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
        seekBgClick
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;