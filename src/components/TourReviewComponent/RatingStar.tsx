export default function RatingStar({ rating }: { rating: number }) {
    return (
        <div className="flex">
            {Array(5)
                .fill(0)
                .map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        // strokeWidth={1.5}
                        // stroke="currentColor"
                        className={`size-5 ${i < rating ? 'fill-primary' : 'fill-primary-foreground'}`}
                        // onClick={
                        //     () => setValue(name, i === +getValues(name) - 1 ? 0 : i + 1)
                        // }
                    >
                        {/* make a star fill them with yellow */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={
                                rating >= i + 1
                                    ? 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z'
                                    : 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z'
                            }
                        ></path>
                    </svg>
                ))}
        </div>
    );
}