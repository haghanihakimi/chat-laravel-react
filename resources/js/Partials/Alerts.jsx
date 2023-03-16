import { useDispatch, useSelector } from "react-redux"
import { btnCancel, btnConfirm, btnOK } from '../store/alerts'
import Alerts from '../Partials/Loading'


export default function({}) {
    const alerts = useSelector((state) => state.alerts)
    const dispatch = useDispatch()

    const renderButton = alerts.options.buttons.map(button => {
        switch(button.type) {
            case 'Confirm':
                return <button key={button.type} 
                type="button" 
                className='bg-blue text-white text-base font-semibold tracking-wide rounded shadow-md px-4 py-2 flex flex-row gap-2 justify-between items-center'
                onClick={() => { dispatch(btnConfirm()) }}>
                    <span>
                        {button.text}
                    </span>
                    {
                        alerts.options.loading
                        ? <span>
                            <Alerts color='text-white text-opacity-20 fill-white' width={4} height={4} />
                        </span>
                        : ''
                    }
                </button>
            case 'Cancel':
                return <button key={button.type} 
                type="button" 
                className='bg-black bg-opacity-20 text-black text-base font-semibold tracking-wide rounded shadow-md px-4 py-2 flex flex-row gap-2 justify-between items-center'
                onClick={() => { dispatch(btnCancel()) }}>
                    {button.text}
                </button>
            case 'OK':
                return <button key={button.type} 
                type="button" 
                className='bg-blue text-white text-base font-semibold tracking-wide rounded shadow-md px-4 py-2 flex flex-row gap-2 justify-between items-center'
                onClick={() => { dispatch(btnOK()) }}>
                    {button.text}
                </button>
            case 'Delete':
                return <button key={button.type} 
                type="button" 
                className='bg-red text-white text-base font-semibold tracking-wide rounded shadow-md px-4 py-2 flex flex-row gap-2 justify-between items-center'
                onClick={() => { dispatch(btnOK()) }}>
                    <span>
                        {button.text}
                    </span>
                    {
                        alerts.options.loading
                        ? <span>
                            <Alerts color='text-white text-opacity-20 fill-white' width={4} height={4} />
                        </span>
                        : ''
                    }
                </button>
            default:
                break;
        }
    })

    return(
        <>
            <div className="w-screen h-screen animate-fadeIn fixed flex justify-center items-center top-0 left-0 z-[99999989] backdrop-blur-xl bg-milky-white bg-opacity-80 dark:bg-black dark:bg-opacity-80">
                <div className="w-full max-w-xl bg-white px-2 shadow-lg rounded animate-alertFadeIn">
                    <h3 className="w-full text-base text-black py-2 font-semibold tracking-wide border-b border-black border-opacity-5">
                        {alerts.options.title.length > 0 ? alerts.options.title : ''}
                    </h3>
                    <p className="w-full text-sm text-black font-medium tracking-wide py-2">
                        {
                            alerts.options.body.length > 0
                            ? alerts.options.body
                            : ''
                        }
                    </p>
                    <div className="w-full flex flex-row gap-2 justify-end items-center px-2 py-4">
                        {
                            alerts.options.buttons.length > 0
                            ? renderButton
                            : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}