new Vue({
    el: '#vue-app',
    data:{
        usernameInput: '',
        userData: null,
        badUserRequest: false,
        favourited: false,
        savedFavs: []
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
                        this.setFavStar();                       
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
        },
        addFav(){
            if(!this.favourited)
            {
                if(!this.savedFavs.includes(this.usernameInput))
                {
                    this.savedFavs.push(this.usernameInput);
                    console.log(this.savedFavs);

                    localStorage.setItem("savedFavs", JSON.stringify(this.savedFavs));
                    this.favourited = true;
                }
                else
                {
                    console.log("Array already contains" + this.usernameInput);
                }
            }
            else
            {
                //removeItem(this.usernameInput, this.savedFavs);
                var index = this.savedFavs.indexOf(this.usernameInput);
                if (index !== -1) {
                    this.savedFavs.splice(index, 1);
                    }
                localStorage.setItem("savedFavs", JSON.stringify(this.savedFavs));
                this.favourited = false;
            }
        },
        changeUserByClick(i){
            console.log("clicked");
            this.usernameInput = this.savedFavs[i];
            
            this.getJSON();
        },
        setFavStar()
        {
            if(this.savedFavs.indexOf(this.usernameInput) !== -1){
                this.favourited = true;
            }
            else{
                this.favourited = false;
            }
        }
        
        
    },
    mounted(){
        //localStorage.removeItem("savedFavs"); 
        var parsed = JSON.parse(localStorage.getItem("savedFavs"));
        console.log(parsed);
        if(parsed != null && parsed.length > 0)
            this.savedFavs = parsed;
    }
})