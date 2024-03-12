import { LoginLogo } from "../assets"
import { accessUrl } from "../authorization"
function LoginPage() {

  return (
    <div className="bg-black h-[100vh] flex flex-col items-center justify-between pt-10 pb-[200px]">
      <img src={LoginLogo} alt="" width={600} height={200} />
      <a href={accessUrl}>
        <button className="bg-primary py-4 px-8 rounded-full text-[28px] text-white font-bold" >
          LOGIN WITH SPOTIFY
        </button>
      </a>
    </div>
  )
}

export default LoginPage