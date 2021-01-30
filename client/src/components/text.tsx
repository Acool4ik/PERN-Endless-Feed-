import {connect} from 'react-redux'


const Test = ({state} : any) => {




    return (
        <button onClick={() => console.log(state)}>
            click
        </button>
    )
}

export default connect(null, null)(Test)