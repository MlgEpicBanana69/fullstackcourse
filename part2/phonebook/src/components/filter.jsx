const Filter = ({value, setValue}) => {
    const onChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <input value={value} onChange={onChange}/>
    )
}

console.log("Filter component defined...");
export default Filter