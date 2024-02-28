//options
console.log('ok');
const passInput = document.getElementById('password');
const hideCompleted = false
const showPasswordButton = true
const length = 16

//pop up object that holds test functions
var passPop = {
  password : "",
  conditions : [
    function(){
      let s = `Password must be over ${length} characters`;
      passPop.password.length > 10 ? passPop.content[s] = true : passPop.content[s] = false
    },
    function(){
      let s = "Password must contain a number";
      (passPop.password.match(new RegExp('[0-9]'))) ? passPop.content[s] = true : passPop.content[s] = false
    },
    function(){
      let s = "Password must contain an uppercase letter";
      (passPop.password.match( RegExp('[A-Z]'))) ? passPop.content[s] = true : passPop.content[s] = false
    },
    function(){
      let s = "Password must contain a lowercase letter";
      (passPop.password.match(new RegExp('[a-z]'))) ? passPop.content[s] = true : passPop.content[s] = false
    }
  ],
  content : {},
  complete : false,
  run : function(){
    passPop.conditions.forEach(function (func) {
      func()
    })
  },
  generateHTML : function(){
    let ol_list = document.createElement("ol");
    let ol_att = document.createAttribute("class");
    ol_att.value = "list-group"
    ol_list.setAttributeNode(ol_att)
    passPop.complete = true
    for (const [key, value] of Object.entries(passPop.content)) {
      let li_list = document.createElement("li");
      let li_att = document.createAttribute("class");
      let li_hide = document.createAttribute("display")
      li_hide.value = "hidden"
      li_att.value = value == true? "list-group-item list-group-item-success" : "list-group-item list-group-item-danger"
      li_list.setAttributeNode(li_att)
      li_list.innerHTML = key
      if (hideCompleted) {
        if(value==false) ol_list.append(li_list)
      } else {
        ol_list.append(li_list)
      }
      if (value==false) passPop.complete = false
    }
    return ol_list
  }
}

function togglePassword() {
  passInput.type === "password" ? passInput.type = "text" : passInput.type = "password"
}


//add stylesheet to document to style the popover
$("head").append('<style id="custom_styling" type="text/css"></style>')
$('#custom_styling').html('.popover-body {padding : 0}');
//link popover to popover content
$("#password")
  .popover({content: passPop.generateHTML() , placement: 'auto' , container: "body"})
  .blur(function () {
    $(this).popover('hide');
  })
//on input change update the popover content
$('#password').on('input', function() {
  console.log('ooo');
  passPop.password = $(this).val()
  passPop.run()
  let popover = $('#password').data('bs.popover');
  popover.config.content = passPop.generateHTML()
  passPop.complete == false? popover.show() : popover.hide()
})

$("#show_password").click(function(){
  togglePassword()
})

