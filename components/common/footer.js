import Image from "next/image";

export default function Footer() {

    return (
        <footer className="w-full px-5 py-10 bg-[#202020] text-[#f7f7f7]">
            <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-2 text-sm">
                <div className="flex flex-col items-center md:items-start">
                    <a
                        aria-label="click counter online"
                        className="flex items-center mb-3"
                        title="click counter online"
                        href={`/`}
                    >
                        <Image
                            width={200}
                            height={100}
                            src={"/ctw.svg"}
                            className="transition-all hover:scale-110 w-6 md:w-10 h-6  bg-white"
                            alt="logo"
                        ></Image>
                        <div className="ml-3 font-bold leading-5">
                            游戏激活码兑换系统
                        </div>
                    </a>
                    
                </div>
            </div>
        </footer>
    );
}
