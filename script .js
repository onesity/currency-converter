window.addEventListener('load',()=>{
    
    const base_currecny=document.getElementById('basecurrecny');
    const to_currency=document.getElementById('tocurrecny');
    const basecurrency_error=document.getElementById('basecurrency-error');
    const convert_btn=document.getElementById('convert-btn');
    const swap_btn=document.getElementById('swap-btn');
    const from_amount=document.getElementById('from-amount');
    const to_amount=document.getElementById('to-amount');
    const theme_btn=document.getElementById('theme-btn');
    const body=document.getElementById('body');
    // const base_currency_details=document.querySelector('.base-currency-details');
    const target_currency_details=document.querySelector('.target-currency-details');


    const apikey='6cd1ce9e5ad24df910293e81';
    fetch('https://gist.githubusercontent.com/ibrahimhajjaj/a0e39e7330aebf0feb49912f1bf9062f/raw/d160e7d3b0e11ea3912e97a1b3b25b359746c86a/currencies-with-flags.json')
    .then(function(res){
        return res.json();
    }).then(function(data){
        data.map((e)=>{
            const option1=document.createElement('option');
            const option2=document.createElement('option');
            option1.value=e.code;
            option1.innerText=e.country+' ('+e.code+')';
            option2.value=e.code;
            option2.innerText=e.country+' ('+e.code+')';
            base_currecny.add(option1);
            to_currency.add(option2);
        })
    })

    convert_btn.addEventListener('click',(e)=>{
        // base_currency_details.innerHTML='';
        target_currency_details.innerHTML='';
        if(from_amount.value==''){
            basecurrency_error.style.display='block';
            basecurrency_error.style.marginLeft='5%';
            basecurrency_error.style.color='red';
            from_amount.style.border='1.5px solid red';
            from_amount.style.paddingLeft='10px';
        }else{
            basecurrency_error.style.display='none';
            basecurrency_error.style.color='red';
            from_amount.style.border='1.5px solid black';
            from_amount.style.color='black';
            from_amount.style.paddingLeft='10px';
            const currency1=base_currecny.value;
            const currency2=to_currency.value;
            const url='https://v6.exchangerate-api.com/v6/'+apikey+'/pair/'+currency1+'/'+currency2+'/'+from_amount.value;
            fetch(url).then(function(res){
                return res.json();
            }).then((data)=>{
                to_amount.value=data.conversion_result;
                
                const amount_title=document.createElement('h5');
                const base_currency_title=document.createElement('h5');
                const result_amount_title=document.createElement('h5');
                const base_currency_updated_time=document.createElement('h5');
                const conversion_rate_title=document.createElement('h5');
                const next_update_title=document.createElement('h5');
                const to_currency_title=document.createElement('h5');
    
    
    
                amount_title.innerHTML='Amount : '+from_amount.value+' '+base_currecny.value;
                result_amount_title.innerHTML='Converted Amount : '+data.conversion_result+' '+to_currency.value;
                base_currency_title.innerHTML='Base Currency : '+base_currecny.value;
                base_currency_updated_time.innerHTML='Last Updated at : '+data.time_last_update_utc;
                conversion_rate_title.innerHTML='Conversion rate : '+data.conversion_rate;
                next_update_title.innerHTML='Next Update at : '+data.time_next_update_utc;
                to_currency_title.innerHTML='Target Currency : '+to_currency.value;
                
                amount_title.id='title';
                base_currency_title.id='title';
                result_amount_title.id='title';
                base_currency_updated_time.id='title';
                conversion_rate_title.id='title';
                next_update_title.id='title';
                to_currency_title.id='title';
    
    
                target_currency_details.appendChild(amount_title);
                target_currency_details.appendChild(result_amount_title);
                target_currency_details.appendChild(base_currency_title);
                target_currency_details.appendChild(to_currency_title);
                target_currency_details.appendChild(conversion_rate_title);
                target_currency_details.appendChild(base_currency_updated_time);
                target_currency_details.appendChild(next_update_title);
                
            })
        }
        
        
    })

    swap_btn.addEventListener('click',(e)=>{
        const temp_currency=base_currecny.value;
        base_currecny.value=to_currency.value;
        to_currency.value=temp_currency;

    })

    let count=0;
    theme_btn.addEventListener('click',function(){
        if(count==0){
            body.style.background='lightblue';
            count=1;
        }else{
            body.style.background='white';
            count=0;
        }
    })
})