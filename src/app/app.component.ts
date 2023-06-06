import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GetAnalysisService } from './services/get-analysis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'secuenciaMutante';

  name:any;
  dni:any;
  showInfo=false;
  arrSequence = ['A', 'T', 'C', 'G' ];
  validSequence=false;
  sequence = [];
  sequencePosition = [];
  loader=false;
  getCheck=false;

  dnaMatrix:string[][] = Array.from(Array(6),()=>Array(6).fill(''));

  constructor(
    private getAnalysisService: GetAnalysisService
  ) {
  }

  ngOnInit(): void {
    
  }

  

  //Envío de formulario y validaciones

  async checkSequence(form:NgForm){
    if(!this.dni){
      this.dni='';
    }
    if(!this.name){
      this.name='';
    }
    
    if(this.name && this.dni && form.invalid){
      this.validSequence=true;
      return
    }

    if(this.sequencePosition.length>0){
      this.sequencePosition.forEach((e:any) => {
        document.getElementById(`sequence${e}`)?.classList.remove('bg-green-600');
        document.getElementById(`sequence${e}`)?.classList.remove('text-white');
        document.getElementById(`sequence${e}`)?.classList.add('text-black');
        document.getElementById(`sequence${e}`)?.classList.add('bg-gray-100');
      });

      
    }
    
    if(form.valid){
      this.loader=true;
      await this.getAnalysisService.generateAnalysis(this.dnaMatrix).then(resp => {
        this.getCheck = resp.result;
        if(resp.result){
            this.sequence = resp.sequence;
          	this.sequencePosition = resp.positionSequence;
          	if(this.sequencePosition.length>0){
            	this.sequencePosition.forEach((e:any) => {
              	document.getElementById(`sequence${e}`)?.classList.remove('bg-gray-100');
              	document.getElementById(`sequence${e}`)?.classList.add('text-white');
              	document.getElementById(`sequence${e}`)?.classList.add('bg-green-600');
            	});

              
          	}

            
        	}

          setTimeout(() => {
            this.showInfo=true;
          }, 1000);
	        
          this.loader=false;
        	
      	}, err => {
        	console.log("file: app.component.ts:49 >> err:", err)
     	}
      )
    }
  }

  //Función que me permite cambiar de input una vez escriba al igual que manipular la Información
  writeSequence(ev:Event, i:number, j:number, next:any){
    let nextInput = next;
    this.dnaMatrix[i][j] = this.dnaMatrix[i][j].toUpperCase();
    if(!this.arrSequence.includes(this.dnaMatrix[i][j])){
      this.dnaMatrix[i][j] = '';
      return;
    }
    if(i==5 && j == 5){
      return;
    }
    if(j==5 && i<5){
      nextInput = `sequence${i+1}${0}`
    }
    document.getElementById(`${nextInput}`)?.focus();

  }
  
  //Función que me devuelve una letra aleatoria del array de letras disponible
  random(){
    const indiceAleatorio = Math.floor(Math.random() * this.arrSequence.length);
    const valorAleatorio = this.arrSequence[indiceAleatorio];
    
    return (valorAleatorio);
  }
  
  //Funcion que asigna letras aleatoria a cada posición del array
  randomGenerate(){
    if(this.sequencePosition.length>0){
      this.sequencePosition.forEach((e:any) => {
        document.getElementById(`sequence${e}`)?.classList.remove('bg-green-600');
        document.getElementById(`sequence${e}`)?.classList.remove('text-white');
        document.getElementById(`sequence${e}`)?.classList.add('text-black');
        document.getElementById(`sequence${e}`)?.classList.add('bg-gray-100');
      });

      
    }
    this.dnaMatrix = Array.from(Array(6), () => Array(6).fill('').map((b) => { return this.random(); }))
  }


  clear(){
    if(this.sequencePosition.length>0){
      this.sequencePosition.forEach((e:any) => {
        document.getElementById(`sequence${e}`)?.classList.remove('bg-green-600');
        document.getElementById(`sequence${e}`)?.classList.remove('text-white');
        document.getElementById(`sequence${e}`)?.classList.add('text-black');
        document.getElementById(`sequence${e}`)?.classList.add('bg-gray-100');
      });

      
    }
    this.name=undefined;
    this.dni=undefined;
    this.dnaMatrix = Array.from(Array(6),()=>Array(6).fill(''));
  }




}
