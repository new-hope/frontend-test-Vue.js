var app = new Vue({
  el: '#app',
  data: {
    flagPopUp: false,
    parentText: null,
    parentParam: null,
    parentBtn: null,
    comments: []
  },
  methods: {
    showButtons: function (){
      var input = document.getElementsByClassName('content__input_border_none')[0],
          input_btn = document.getElementsByClassName('input__btn')[0],
          btn_save = document.getElementsByClassName('input__btn_save')[0];

      if (!input.value) {
        btn_save.setAttribute('disabled', true);
        input_btn.style.display = "block";
      } else {
        btn_save.removeAttribute('disabled');
        btn_save.style.backgroundColor = "rgb(0,188,212)";
        input_btn.style.display = "block";
      }
    },
    onFocus: function (){
      var input_btn = document.getElementsByClassName('input__btn')[0],
          btn_save = document.getElementsByClassName('input__btn_save')[0];

      btn_save.setAttribute('disabled', true);
      btn_save.style.backgroundColor = "rgb(214,214,214)";
      input_btn.style.display = "block";
    },
    save: function (){
      var input = document.getElementsByClassName('content__input_border_none')[0],
          input_btn = document.getElementsByClassName('input__btn')[0],
          date = new Date(),
          options = {day: "numeric", month: "long"};

      this.comments.unshift({name: "Alexey Grishchenko" + ", ", text: input.value, date: date.toLocaleString("ru", options)});
      input_btn.style.display = "none";
      input.value = "";
    },
    cansel: function (){
      var input_btn = document.getElementsByClassName('input__btn')[0],
          input = document.getElementsByClassName('content__input_border_none')[0];

      input_btn.style.display = "none";
      input.value = "";
    },
    showPopUp: function (event){
      var target = event.target,
          classList = target.classList,
          pop_up = document.getElementsByClassName('pop-up')[0];

      if (!(classList.contains("parametrs__bird") || target.alt === "bird")) return;

      var left = target.getBoundingClientRect().left,
          top = target.getBoundingClientRect().top;

      pop_up.style.left = left + 10 + "px";
      pop_up.style.top = top + 25 + "px";
      this.flagPopUp = !this.flagPopUp;

      while (target.className !== "output") {
        target = target.parentNode;
      }

      for (let i = 0; i < target.children.length; i++){
        let child = target.children[i];
        if (child.className === "output__text"){
          this.parentText = child;
        }
        if (child.className === "parametrs"){
          this.parentParam = child;
        }
        if (child.className === "input__btn"){
          this.parentBtn = child;
        }
      }
      event.stopPropagation();
    },
    hidePopUp: function (){
      if (this.flagPopUp) {
        this.flagPopUp = !this.flagPopUp;
      }
    },
    edit: function (){
      this.parentText.removeAttribute('disabled');
      this.parentText.focus();
      this.parentParam.style.display = "none";
      this.parentBtn.style.display = "block";
    },
    hideBtn: function (){
      this.parentBtn.style.display = "none";
      this.parentParam.style.display = "block";
    }
  }
})
