//@ts-nocheck
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import { BsChevronRight } from 'react-icons/bs';
import { CustomArrowProps } from 'react-slick';
import { cn } from '@/libs/utils';

interface NextArrowProps {
  props?: CustomArrowProps;
  breakpoints: Array<Object>;
  customClassName?: string;
}
const NextArrow: React.FC<NextArrowProps> = (props) => {
  const {
    style,
    onClick,
    currentSlide,
    slideCount,
    breakpoints,
    customClassName,
  } = props;

  const item = useBreakpoint(breakpoints);
  const disabled =
    currentSlide && (slideCount as number) - item === currentSlide;

  return (
    <div
      className={cn(
        'absolute right-0 top-0 h-full translate-x-full  w-20 bg-[#170F23] ',
      )}
      style={{ ...style }}
    >
      <div className="h-full w-full flex items-center bg-transparent">
        {!disabled && (
          <div
            onClick={onClick}
            className={cn(
              '-translate-x-full  w-9 h-9 rounded-full bg-white opacity-60 hover:opacity-100 hover:bg-white flex items-center justify-center cursor-pointer',
              customClassName && customClassName,
            )}
          >
            <BsChevronRight
              size={18}
              className="text-black rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NextArrow;
