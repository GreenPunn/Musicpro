import clsx from 'clsx';
import styles from './MenuItem.module.css';
import Button from '../Button';
function MenuItem(props) {

    return (
        <div className={clsx(styles.wrapper)}>
            <Button {...props} flexstart={'true'} onClick={props.value?props.value.click:()=>{}} to={props.to}>
                {(props.value.icon||props.value.image) && (
                    <img

                        style={props.value.image? {width: 24, height: 24, borderRadius:4}:{
                            filter: props.value.iconFill
                                ? props.value.iconFill
                                : '#invert(100%) sepia(100%) saturate(0%) hue-rotate(88deg) brightness(102%) contrast(101%)',
                        }}
                        src={props.value.icon?props.value.icon:props.value.image}
                    />
                )}
                <span
                    style={{
                        filter: props.value.iconFill
                            ? props.value.iconFill
                            : '#invert(100%) sepia(100%) saturate(0%) hue-rotate(88deg) brightness(102%) contrast(101%)',
                    }}
                    className={clsx(styles.text)}
                >
                    {props.value.text}
                </span>
            </Button>
        </div>
    );
}

export default MenuItem;
