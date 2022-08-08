class Main{
    constructor() {
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.itemList = [];
      this.itemID = 0;
    }

    //the budget code where we will add the budget amount
    BudgetFormadd(){
        const value = this.budgetInput.value;
        this.budgetAmount.textContent= value;
        this.budgetInput.value='';
        this.showBudget();
    }

    //display the budget
    showBudget(){
        //console.log(`hellooo`);
        const expense=this.totalExpense();
        const total= parseInt(this.budgetAmount.textContent)-expense;
        this.balanceAmount.textContent=total;
        if(total<0){
            this.balance.classList.remove('showGreen','showBlack');
            this.balance.classList.add('showRed');
        }
        else if(total>0){
            this.balance.classList.remove('showRed','showBlack');
            this.balance.classList.add('showGreen');
        } 

    }

    expenseFormsub(){

        const expenseValue=this.expenseInput.value;
        const amountValue=this.amountInput.value;
        let amount=parseInt(amountValue);
        this.expenseInput.value="";  //.value cause we want the value to be empty and not the whole input with forms we always use .value
        this.amountInput.value="";
        let expense={
            id:this.itemID,
            title:expenseValue,
            amount:amount,
        }
        this.itemID++;
        this.itemList.push(expense);
        this.addExpense(expense);
        this.showBudget();
        return amount;
        
    }

    addExpense(expense){
        //console.log(`hi`);
        const div=document.createElement('div');
        div.classList.add('expense');
        div.innerHTML=`
        <div class="expense-item d-flex justify-content-between align-items-baseline">
         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item1">${expense.amount}</h5>
         </div>
        </div>`;
        this.expenseList.appendChild(div);

    }

    totalExpense(){
        let total=0;
        if(this.itemList.length>0){  
            total=this.itemList.reduce(function(a,c){    //reduce: to callback a fucntion so as to add up a particular value in the array itemlist[]
                a +=c.amount;  //c.amount to get that particular value from the list
                return a;
            },0);
        }
        this.expenseAmount.textContent=total;
        return total;
    }

  }

function eventlist(){
    const budgetForm=document.getElementById("budget-form");
    const expenseForm=document.getElementById("expense-form");
    const expenseList=document.getElementById("expense-list");

    const main= new Main();   //to get new instance for Main class (important)
    //submiting budget ,expense, expenlist;
    budgetForm.addEventListener('submit',function(event){
        event.preventDefault();
        main.BudgetFormadd();

    })
    expenseForm.addEventListener('submit',function(event){
        event.preventDefault();
        main.expenseFormsub();

    })
    expenseList.addEventListener('click',function(event){
        console.log(event.target);
    })

}

document.addEventListener('DOMContentLoaded',function(){
    eventlist();  
})// callback fucntion we use this to call by loading domcontent