
import Image from "next/image";

export default function Navbar() {

    return (
        <header className="w-full z-50 bg-base-100 p-5 py-2 md:mb-5 shadow-md">
            <div className="max-w-[1280px] flex justify-between items-center mx-auto">
                <a
                    aria-label="click counter online"
                    className="flex items-center w-1/2 md:w-1/5"
                    title="click counter"
                    href={`/`}
                >
                    <Image
                        width={200}
                        height={200}
                        src={"/ctw.svg"}
                        className="transition-all hover:scale-110 w-6 md:w-10 h-6 md:h-10 cursor-pointer"
                        alt="click counter online logo"
                    ></Image>
                    <h1 className="ml-3 font-bold leading-5 cursor-pointer">游戏激活码兑换系统</h1>
                </a>
            </div>
        </header>
    );
}
