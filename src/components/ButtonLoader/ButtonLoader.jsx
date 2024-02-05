import { RotatingLines } from "react-loader-spinner"
import css from './ButtonLoader.module.css'

export const ButtonLoader = ({height, width, color}) => {
  return (
    <div className={css.LoaderWrapper}>
      <RotatingLines
        visible={true}
        height={height}
        width={width}
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  )
}