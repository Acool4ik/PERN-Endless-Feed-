import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {actionsCreator1, actionsCreator2} from '../store/actionsCreators/actionCreator'
import {IActionReduser1, IActionReduser2} from '../store/redusers/rootReduser'
import {IInitialState} from '../store/initialState'


interface IProps {
    change1: (value: string) => IActionReduser1,
    change2: (value: number) => IActionReduser2,
    change3: (value: number) => void,
    state1: string,
    state2: number
}



const Test = (props: IProps) => {

    console.log('UPDATE')
    
    return (<>
        <button onClick={() => console.log(props)}>
            propss
        </button>

        <button onClick={() => {
            props.change1(props.state1 + props.state1)
            console.log(props.state1);
        }}>
            add text
        </button>

        <button onClick={() => {
            props.change2(props.state2 + 1)
            console.log(props.state2);
        }}>
            add number
        </button>


        <button onClick={() => {
            props.change3(props.state2 + 1)
        }}>
            add number async
        </button>

        </>
    )
}


const mapStateToProps = (state: IInitialState) => state

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        change1: bindActionCreators(actionsCreator1, dispatch),
        change2: bindActionCreators(actionsCreator2, dispatch),
        change3: (value: number) => {
            console.log('Loading...')
            setTimeout(() => {
                dispatch(actionsCreator2(value))
                console.log('DONE')
            }, 2000)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)