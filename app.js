new Vue({
    el: '#vue-app',
    data:{
        usernameInput: '',
        userData: null,
        badUserRequest: false,
        displayItems: {
            name: '',
            avatarUrl: '',
            bio: '',
        }
    },
    methods:{
        getJSON(){
            if(!this.validateUsername())
            {
                return;
            }     

            fetch(`https://api.github.com/users/${this.usernameInput}`)
            .then(response => {
                if(response.ok){
                    this.badUserRequest= false;
                    response.json().then(data =>{
                        this.userData = data;                       
                        return;
                    });
                    
                }
                else{
                    this.badUserRequest = true;
                    return;
                }
            })
           

        },
        mapJSONToObject(){
            console.log(userData.bio)
        },
        validateUsername(){
            if(typeof this.usernameInput === 'string' && this.usernameInput.length > 0)
            {
                return true;
            }
            else
            {
                console.log("username was invalid. It is currently:" + this.usernameInput)
                return false;
            }
        }
    }
})