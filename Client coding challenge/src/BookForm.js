import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form onSubmit = {handlesubmit()}>
                <label for = "hmtlname">
                    Name of the volumne
                </label>
                <button for="submit">
                    Search for volumne
                </button>
            </form>
        </div>
    );
}

export default BookForm;