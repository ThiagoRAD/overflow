import Blur from './Blur';

const GlassButton = ({children, ...props}) => {
  console.log(children)
  return (
    <button className='relative overflow-hidden shadow-lg rounded-[--btn-radius] cursor-pointer h-[250px] w-[250px]' {...props}>
      <Blur></Blur>
      {/* {/* <div className='absolute inset-0 backdrop-filter-[--btn-filters]' /> */}
      <div className='absolute inset-0 inline-flex items-center justify-center font-bold text-white bg-[--btn-content-bg]'>{children}</div>
    </button>
  );
};

export default GlassButton;
