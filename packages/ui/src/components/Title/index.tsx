type CustomTitleProps<T> = {
    text: string,
    fontColor: string,
    fontSize?: string,
    
}

type headingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type headingProps<T extends headingTag> = CustomTitleProps<T> & {
    as?: T
}

const CustomTitle = ({text, fontColor, as = "h1"}: headingProps<headingTag>) => {
    const Tag = as || "h1"
  return (
    
    <Tag>
        {text}
    </Tag>
  )
}

export default CustomTitle