import React from "react";
import "../stylesheets/inputBox.css";
const InputBox = () => {
    return (
    <>
    <section>
        <div id="container">

            <span class="input">
            <label for="input-1" class="input__label">
                <span class="input__label-content">First Name</span>
            </label>
            <input type="text" class="input__field" id="input-1" />
            </span>

            <span class="input">
            <label for="input-2" class="input__label">
                <span class="input__label-content">Last Name</span>
            </label>
            <input type="text" class="input__field" id="input-2" />
            </span>

            <span class="input">
            <label for="input-3" class="input__label">
                <span class="input__label-content">Institute Roll No</span>
            </label>
            <input type="text" class="input__field" id="input-3" />
            
            </span>

            <span class="input">
            <label for="input-4" class="input__label">
                <span class="input__label-content">Mobile Number</span>
            </label>
            <input type="text" class="input__field" id="input-4" />
            </span>

            <span class="input message">    
            <label for="input-5" class="input__label">
                <span class="input__label-content">Description of lost  Item</span>
            </label>
            <textarea class="input__field" id="input-5"></textarea>
            </span>

            <button id="send-button" type="button">Report</button>

        </div>
    </section>
    </>);
}

export default InputBox;