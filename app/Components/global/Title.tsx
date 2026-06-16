export const Title = ({text} : {text:string}) => {
    return (
        <div className= "relative text-white md:text-6xl text-3xl font-semibold text-center mb-5 " >
            {text}
        </div>
    )
}

export default Title;