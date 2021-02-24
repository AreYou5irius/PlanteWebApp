import axios, {
    AxiosError
} from "../../node_modules/axios/index"

//HUSK at skrive i terminalen npm install, npm run watch og npm install axios

interface IPlante{
    "planteId": number,
    "planteType": string,
    "planteNavn": string,
    "pris": number,
    "maksHoejde": number
}

//HUSK http*S*
let baseUrl = 'https://studymock1restservice.azurewebsites.net/planter';

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        planteListe: [],
        singlePlanteId: null,
        singlePlanteType: [],
        addMessage: "",
        planteId: null,
        planteById: null,
        planteType: "",
        deleteMessage: null,
        formData: { planteId: undefined, planteType: "", planteNavn: "", pris: undefined, maksHoejde: undefined}
    },

    //HUSK at ændre i tsconfig "target": "es2018" og opdater ellers virker async/await ikke 
    methods: {
       
        async getAllPlanter() {
            let response = await this.getAllPlanterAsync();
            this.planteListe = response.data;
        },
        
        
        async getAllPlanterAsync() {
            try { return axios.get<IPlante>(baseUrl) 
            } catch (error: AxiosError) {
                this.message = error.message;
                alert(error.message)
            }
        },

       
        async getPlanteById(id: number) {
            let response = await this.getPlanteByIdAsync(id);
            this.singlePlanteId = response.data;
        },

        async getPlanteByIdAsync(id: number) {
            let url: string = baseUrl + "/" + id
            try { return axios.get<IPlante>(url)     
            } catch (error) {
                this.message = error.message
                    alert(error.message)
            }
        },
      

        async getPlanteByType(type: string) {
            let response = await this.getPlanteByTypeAsync(type);
            this.singlePlanteType = response.data;
        },

        async getPlanteByTypeAsync(type: string) {
            let url: string = baseUrl + "/planteType/" + this.planteType
            try { return axios.get<IPlante[]>(url)     
            } catch (error) {
                this.message = error.message
                    alert(error.message)
            }
        },

        
    
        async addPlanteAsync() {
            try {
                return axios.post<IPlante>(baseUrl, this.formData)
            }
            catch (error: AxiosError) {
                this.message = error.message
                alert(error.message)
            }
        },

        
        async addPlante(){
          await this.addPlanteAsync();
          this.addMessage = "Planten er Oprettet";  
        },

       
        async deletePlanteById(id: number) {
            await this.deletePlanteByIdAsync(id);
            this.deleteMessage = "planten er slettet";
            
        },

        async deletePlanteByIdAsync(id: number) {
            let url: string = baseUrl + "/" + id
            try { return axios.delete<IPlante>(url)     
            } catch (error) {
                this.message = error.message
                    alert(error.message)
            }
        },

      
        clearOutput() {
            this.formData.planteId = undefined;
            this.formData.planteType = "";
            this.formData.planteNavn = "";
            this.formData.pris = undefined;
            this.formData.maksHoejde = undefined;
            this.addMessage = "";
        },

        clearList() {
            this.planteListe = [];
        },

        clearPlanteId() {
            this.singlePlanteId = null;
            this.planteId = null;
        },

        clearPlanteType() {
            this.singlePlanteType = [];
            this.planteType = "";
        },

        clearDeletePlante(){
            this.planteId = null;
            this.deleteMessage = null;
        }
    
    }
})