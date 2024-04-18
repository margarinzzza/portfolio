import { useEffect, useState, useRef } from "react";
import ProductCardComponent from "../content/main/ProductCardComponent";
import StoryComponent from "../content/main/StoryComponent";

const CarouselComponent = ({ items, type }) => {

    const [visibleArrow, setVisibleArrow] = useState(false)
    const [offset, setOffset] = useState(0)
    const [maxOffset, setMaxOffset] = useState(null)
    const [offsetStep, setOffsetStep] = useState(null)
    
    useEffect(() => {
        type === 'story' && setOffsetStep(200)
        type === 'product' && setOffsetStep(180)
        comapareWrapperAndCarousel()
        window.addEventListener('resize', () => comapareWrapperAndCarousel())
    }, [])

    useEffect(() => {
        const carouselWidth = storiesRef.current.scrollWidth, wrapperWidth = storiesWrapperRef.current.offsetWidth
        carouselWidth < wrapperWidth ? setVisibleArrow(false) : setVisibleArrow(true)
    }, [offset])

    const scrollCarouselForward = () => {
        const potentialStep = offset + offsetStep
        if (potentialStep > maxOffset) {
            setOffset(i => i += (maxOffset - offset + 20))
            setVisibleArrow(false)
        }
        if (potentialStep < maxOffset) setOffset(i => i += offsetStep)
    }

    const scrollCarouselBack = () => {
        const potentialStep = offset - offsetStep
        if (potentialStep <= 0) {
            setOffset(0)
            setVisibleArrow(true)
        } else setOffset(i => i -= offsetStep)
    }

    const comapareWrapperAndCarousel = () => {
        const carouselWidth = storiesRef.current.scrollWidth, wrapperWidth = storiesWrapperRef.current.offsetWidth
        carouselWidth < wrapperWidth ? setVisibleArrow(false) : setVisibleArrow(true)
        setMaxOffset(carouselWidth - wrapperWidth)
    }

    const storiesWrapperRef = useRef(null)
    const storiesRef = useRef(null)

    return (
        <div ref={storiesWrapperRef} className={`main_block stories-wrapper relative flex`}>
            <div className={`stories_arrow ${offset == 0 && 'hidden'}`}>
                <svg onClick={() => scrollCarouselBack()} xmlns="http://www.w3.org/2000/svg" width="28" height="80" viewBox="0 0 28 80" fill="none">
                    <path d="M14.3509 58.1968L11.7139 59.3119C3.40152 62.8266 -2 70.9751 -2 80L-2.00001 2.44784e-06C-2.00001 9.38273 3.46963 18.0567 12 21.9642L14.8662 23.2771C21.6501 26.3846 26 33.1617 26 40.6235C26 48.2896 21.4117 55.2113 14.3509 58.1968Z" fill="white" />
                    <path d="M19.75 39.9999C19.75 39.5857 19.4142 39.2499 19 39.2499L10 39.2499L8.01777 39.2499C7.57312 39.2491 7.35006 38.7112 7.66421 38.3963L9.03033 37.0302L12.5303 33.5302C12.8232 33.2373 12.8232 32.7624 12.5303 32.4695C12.2374 32.1767 11.7626 32.1767 11.4697 32.4695L4.46967 39.4695C4.24869 39.6905 4.19443 40.0151 4.30691 40.287C4.34351 40.3754 4.39776 40.4583 4.46967 40.5302L7.96967 44.0302L11.4697 47.5302C11.7626 47.8231 12.2374 47.8231 12.5303 47.5302C12.8232 47.2373 12.8232 46.7624 12.5303 46.4695L9.03033 42.9695L7.66421 41.6034C7.34923 41.2885 7.57232 40.7499 8.01777 40.7499L10 40.7499L19 40.7499C19.4142 40.7499 19.75 40.4141 19.75 39.9999Z" fill="#404040" />
                </svg>
            </div>
            <div ref={storiesRef} className={`stories overflow-x-hidden`}>
                {type === 'story' && items.map((el, idx) => <div key={idx} className="transition-all duration-500" style={{ marginLeft: `${idx === 0 && `-${offset}px`}` }}><StoryComponent title={el.title} storyId={el.storyId} /></div> )}
                {type === 'product' && items.map((el, idx) => <div key={idx} className="transition-all duration-500" style={{ marginLeft: `${idx === 0 && `-${offset}px`}` }}><ProductCardComponent key={idx} data={el} isInCart={false} /></div> )}

            </div>
            <div className={`stories_arrow right-[-1px] ${!visibleArrow && 'hidden'}`}>
                <svg onClick={() => scrollCarouselForward()} xmlns="http://www.w3.org/2000/svg" width="28" height="80" viewBox="0 0 28 80" fill="none">
                    <path d="M11.6491 21.8032L14.2861 20.6881C22.5985 17.1734 28 9.0249 28 0V80C28 70.6173 22.5304 61.9433 14 58.0358L11.1338 56.7229C4.34987 53.6154 0 46.8383 0 39.3765C0 31.7104 4.58828 24.7887 11.6491 21.8032Z" fill="white" />
                    <path d="M6.25 40.0001C6.25 40.4143 6.58579 40.7501 7 40.7501H16H17.9822C18.4269 40.7509 18.6499 41.2888 18.3358 41.6037L16.9697 42.9698L13.4697 46.4698C13.1768 46.7627 13.1768 47.2376 13.4697 47.5305C13.7626 47.8233 14.2374 47.8233 14.5303 47.5305L21.5303 40.5305C21.7513 40.3095 21.8056 39.9849 21.6931 39.713C21.6565 39.6246 21.6022 39.5417 21.5303 39.4698L18.0303 35.9698L14.5303 32.4698C14.2374 32.1769 13.7626 32.1769 13.4697 32.4698C13.1768 32.7627 13.1768 33.2376 13.4697 33.5305L16.9697 37.0305L18.3358 38.3966C18.6508 38.7116 18.4277 39.2501 17.9822 39.2501H16H7C6.58579 39.2501 6.25 39.5859 6.25 40.0001Z" fill="#404040" />
                </svg>
            </div>
        </div>
    )
}

export default CarouselComponent;
