import './styles.css';

export const TextInput = ({ searchValue, eventChange }) => {
    return(
        <input 
          className="text-input"
          type="search"
          value={searchValue}
          onChange={ eventChange }
          placeholder="Type your search"
        />
    );
}