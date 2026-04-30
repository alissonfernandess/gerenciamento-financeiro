import './FrameImg.scss';

type FrameImgProps = {
    children?: React.ReactNode,
    height?: number,
    width?: number
    backgroundImage?: string,
    className?: string,
    style?: React.CSSProperties
}

// Um frame básico da aplicação que possui uma imagem de background

const FrameImg = ({ children, backgroundImage = '/profileBackground.png', className, style }: FrameImgProps) => {

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, ...style }} className={`FrameImg ${className || ''}`}>
            {children}
        </div>
    )
}
    

export default FrameImg