import { useDispatch, useSelector } from "react-redux"
import { LuLibrary } from "react-icons/lu";
import TaskList from "../loaders/PlaylistsLoader"
import { EmptyPlaylist } from '../assets/index'
import { Link } from "react-router-dom";
import { fetchPlaylist, removePlaylist } from "../redux/reducers/fetchPlaylist";

function Playlists() {

    const playlists = useSelector((state) => (state.playlists))
    const dispatch = useDispatch()
    const token = useSelector((state) => (state.token))

    return (
        <div className="flex flex-col gap-2 h-full">
            <div className="flex gap-4 items-center px-2 pt-2">
                <LuLibrary size={25} />
                <h1 className="text-lg">Your Playlists</h1>
            </div>
            {playlists.length > 0 ? playlists.map((item) => {
                const img = { ...item.images[0] }
                return (
                    <Link to={`/playlist/${item.id}`} key={item.id}>
                        <div className="flex gap-4 items-center hover:bg-[#252525] p-2 rounded-md cursor-pointer"
                            onClick={() => {
                                dispatch(removePlaylist()) && dispatch(fetchPlaylist({ access_token: token, id: item.id }))
                            }}>
                            <img src={img.url || EmptyPlaylist} alt="" width={50} height={50} className="rounded-sm" />
                            <div className="max-w-[80%] ">
                                <p className="text-md text-gray-100 truncate">{item.name}</p>
                                <span className="text-sm text-gray-400">Playlist &#x2022; </span>
                                <span className="text-sm text-gray-400">{item.owner.display_name}</span>
                            </div>
                        </div>
                    </Link>
                )
            }) : <TaskList />
            }
        </div>
    )
}

export default Playlists