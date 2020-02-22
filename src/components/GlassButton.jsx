const GlassButton = ({children, ...props}) => {
  return <button className="relative overflow-hidden shadow-lg rounded-[--btn-radius] cursor-pointer h-[20px] w-[20px]"  {...props}>
    <div className="absolute inset-0 backdrop-filter-[--btn-filters]"/>
    <div className="absolute inset-0 inline-flex items-center justify-center font-bold text-white bg-[--btn-content-bg]">
        {children}
      </div>
    </button>
}

export default GlassButton
