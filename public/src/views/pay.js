import "../styles/pay.css"


function pay(navigateTo) {
   
const totalFinalShop = localStorage.getItem('totalFinalShop');
const userName = localStorage.getItem('userName');

const payContainer = document.createElement('section');
payContainer.classList.add('container-pay');
const paySection = document.createElement('div');
paySection.classList.add('containerInner-pay');

const payEstructure = `
<nav class="navPay">  
    <img src="../../assets/logoGameAncho.png" alt="logo" class="nav-logo-pay">
</nav>

<section class="formSection">
    <form class="formContainer">
        <span class="paymentAmount">Payment amount <span class="paymentAmountTotal">$${totalFinalShop}</span></span>
        <div class= "formName">
            <label for="inputNombreTarjeta">Owner Name</label>
            <!---------------- INPUT NOMBRE DE TARJETA ----------------->
            <input type="text" class="inputNombreTarjeta" placeholder="Nombre y Apellido" required >
        </div>
        <div class= "formNumberCard">
            <label for="inputNumeroTarjeta">Card Number</label>
            <!---------------- INPUT NÚMERO DE TARJETA ----------------->
            <input type="text" class="inputNumeroTarjeta" placeholder="Ej. 1234 5678 9012 3456" maxlength="19" autocomplete="off" required >
            <p class="alertIsValid"></p>
        </div>    

        <div class="groupFlexbox">
            <div class="positionExpiration">
                <label for="selectMes">Expiry date (MM/YY)</label>
                <div class="formGroupSelect">
                    <div class="select">
                    <!------------------ SELECTBOX MES -------------------->
                        <select name="mes" class="selectMes">
                            <option disabled selected>Mes</option>
                        </select>
                    </div>           
                    <div class="select"> 
                    <!----------------- SELECTBOX AÑO --------------------->
                        <select name="year" class="selectYear">
                            <option disabled selected>Año</option>
                        </select>
                    </div>
                </div>                   
            </div>

            <div class="positioncvv">
                <label for="inputCVV">CVV</label>
                <!------------------- INPUT CVV --------------------->
                <input class="inputcvv" type="text" id="inputCVV" maxlength="3"  placeholder="Ej. 123" required>
            </div>
        </div>
    
        <button type="submit" class="btnPagar " id="btnPagar">
        <img src="../../assets/icons/candado-cerrado.png" alt="logo" class="padlock">
        Pay $${totalFinalShop} 
        </button>

        <!-------- MENSAJE FINAL ------->
        <div class="mensajeFinal"></div>

        <div class="logoTarjetContainer"></div>
    </form> 
</section>

<div class="loginFooter">
        <p>Copyright© 2023 | Created by <a href="https://github.com/ElesisIzanami">Franz Cristhians Minaya</a></p>
    </div>

`;
    paySection.innerHTML = payEstructure;
    let cardNumberFigures =""
// ------------------------------NOMBRE DEL TITULAR----------------------------
        const inputNombreTarjeta = paySection.querySelector('.inputNombreTarjeta');
   
        inputNombreTarjeta.addEventListener("input", (event)=> {
        let valorInputNombreTarjeta = event.target.value;
        console.log("Se ha producido un evento input:", event.target.value);
        inputNombreTarjeta.value = valorInputNombreTarjeta.replace(/[0-9]/g, '');
    }); 

// ------------------------------NUMERO DE TARJETA---------------------------
    const alertIsValid = paySection.querySelector('.alertIsValid');  
    const logoTarjetContainer = paySection.querySelector('.logoTarjetContainer'); 
    const inputNumeroTarjeta = paySection.querySelector('.inputNumeroTarjeta');
     
      inputNumeroTarjeta.addEventListener('input', (e) => {
        let valorInputNumeroTarjeta = e.target.value;
        
        inputNumeroTarjeta.value = valorInputNumeroTarjeta
        // ------------- ELIMINAMOS ESPACIOS EN BLANCO ----------------
          .replace(/\s/g, '')
        // ------------- ELIMINAR LAS LETRAS --------------------------
          .replace(/\D/g, '')
        // ------------- PONEMOS ESPACIO CADA 4 NÚMEROS ---------------
          .replace(/([0-9]{4})/g, '$1 ')
        // ------------- ELIMINA EL ÚLTIMO ESPACIO --------------------
          .trimEnd();
    
          cardNumberFigures =inputNumeroTarjeta.value.replace(/\s/g, '');
        console.log("cardNumberFigures",cardNumberFigures)
          
          // DESAPARECER ALERTA CUANDO ELIMINAMOS UN DIGITO MENOR A 16
        if(cardNumberFigures.length<16) {
          alertIsValid.innerText=""
        }

        if(cardNumberFigures.length<16) {
          alertIsValid.innerText=""
        }
    
        });

    

// ---------------------------------SELECT---------------------------------------
    const selectMes = paySection.querySelector('.selectMes');
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    // Agrega las opciones al selectMes
    for (let i = 0; i < meses.length; i++) {
      const option = document.createElement("option");
      option.text = meses[i];
      option.value = i + 1; // Puedes establecer el valor como desees
      selectMes.appendChild(option);
    }

    const selectYear = paySection.querySelector('.selectYear');
    const years = [
      "2023", "2024", "2025", "2026", "2027", "2028",
      "2029", "2030"];
    
    // Agrega las opciones al selectYear
    for (let i = 0; i < years.length; i++) {
      const option = document.createElement("option");
      option.text = years[i];
      option.value = i + 1; // Puedes establecer el valor como desees
      selectYear.appendChild(option);
    }

// -----------------------------------INPUT CVV ------------------------
    const inputcvv = paySection.querySelector('.inputcvv');

    inputcvv.addEventListener('input', () =>{
        inputcvv.value = inputcvv.value
        // ---------------- ELIMINAMOS ESPACIOS EN BLANCO ----------------
          .replace(/\s/g, '')
        // ---------------- ELIMINAR LAS LETRAS --------------------------
          .replace(/\D/g, '');
       
      });


//------------------function VALIDATOR CARD----------------
function isValid(creditCardNumber) {  

    const digitos = creditCardNumber.split("").map(Number).reverse();
    let suma = 0;

    for (let i = 0; i < digitos.length; i++) {

      if (i % 2 === 1) {
        let doble = digitos[i] * 2;
        if (doble > 9) {
          doble -=  9;
        }
        suma += doble;
      } else {
        suma += digitos[i];
      }
    }

    return suma!== 0 && suma % 10 === 0;
  }


  // ------------------------------- VALIDANDO EL NÚMERO DE LA TARJETA --------------------------- 
    
  const mensajeFinal = paySection.querySelector('.mensajeFinal');
  
  const btnPagar = paySection.querySelector('.btnPagar');
  btnPagar.addEventListener('click', (event) => {
    
    
    let numberIsValid = isValid(cardNumberFigures)
  
    if(numberIsValid) {
      alertIsValid.innerText=("La tarjeta es válida.")
      mensajeFinal.innerText = ('Gracias por tu compra!');
      setTimeout(()=>{
        navigateTo('/shop')
      }, 3000);
      
  
    }else {
      alertIsValid.innerText=("La tarjeta no es válida. Ingrese correctamente el número")
    }
       
  });
  
    payContainer.appendChild(paySection);
    return payContainer;
}

export default pay