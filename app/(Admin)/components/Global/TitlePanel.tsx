
type props = {
    title : string
}
export const TitlePanel  = ({title} : props ) => {
    return (
        <div>
            <h1 className="text-3xl  font-bold text-white mt-5">{title}</h1>
            <div className="w-12 h-[3px] bg-green-600 mt-2 rounded-full"/>
        </div>
    )
}
export default TitlePanel;