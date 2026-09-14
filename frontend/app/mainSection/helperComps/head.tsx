
type HeadProps = {
    head: {
        volume: string
        headline: string
        index: string
    }
    body: {
        title: string
        feature1: string
        feature2: string
        headPara: string
        bodyPara: string
    }
}

const Header = (
    { ...props }: HeadProps,
    childern: React.ReactNode | undefined = undefined
) => {
    return (
        <>
            {/* Index Bar */}
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-4 my-16 text-xs uppercase tracking-widest font-mono text-[#7A5C43]">
                <span>{props.head.volume}</span>
                <span className="hidden md:inline">{props.head.headline}</span>
                <span>{props.head.index}</span>
            </div>

            {/* Section Header */}
            {childern ?? <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
                <div className="lg:col-span-6">
                    <span className="block text-xs font-mono text-[#E27D60] uppercase tracking-widest mb-3">
                        {props.body.title}
                    </span>
                    <h2 className="text-6xl sm:text-8xl font-serif font-normal tracking-tight text-[#1A1A1A] leading-[0.95]">
                        {props.body.feature1} <br />
                        <span className="italic font-light ml-4 sm:ml-12 text-[#7A5C43]">
                            {props.body.feature2}
                        </span>
                    </h2>
                </div>
                <div className="lg:col-span-6 pt-2">
                    <p className="text-xl sm:text-2xl font-serif text-[#333] leading-relaxed mb-6 border-l-2 border-[#1A1A1A] pl-6">
                        {props.body.headPara}
                    </p>
                    <p className="text-sm text-[#666] leading-relaxed max-w-xl">
                        {props.body.bodyPara}
                    </p>
                </div>
            </div>}
        </>
    )
}

export default Header