import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAnalysisService {
  private xLength = 0;
  private yLength = 0;
  private dnaMatrix:string[][] = Array.from(Array(6),()=>Array(6).fill(''));

  private positionSequence:any=[];
  private sequence:any=[];

  constructor() { }

  generateAnalysis(data:string[][]): Promise<any>{
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        this.positionSequence = [];
        this.dnaMatrix=data;
        this.xLength = this.dnaMatrix.length;
        this.yLength = this.dnaMatrix[0].length;
        const result = this.getAnalysis(0,0)
        resolve({
          result,
          positionSequence: this.positionSequence,
          sequence: this.sequence
        })
      }, 3000);
    })
  }



  //Función principal para empezar la comprobación
  private getAnalysis(x:any,y:any):any{

    //Caso limite si el eje x sobrepasa el limite, ya evualuando los eje y
    if(x>=this.xLength){
      return false;
    }
  
    //Obtengo valor en la posicion (0,0) de la matriz
    const dataPosition = this.dnaMatrix[x][y];

    //Condicion de comprobacion de las letras repetidad en los ejes x,y y tambien en las diagonales izq - der
    if(this.analysisX(x,y, dataPosition,0) || this.analysisY(x,y,dataPosition,0) || this.analysisXY(x,y,dataPosition,0, 'diagonalOne') || this.analysisXY(x,y,dataPosition,0, 'diagonalTwo')){
      return true;
    }
    
    //Condicion para seguir recoriendo el eje y
    if(y+1 < this.yLength){
      return this.getAnalysis(x, y+1)
    }

    // seguir recoriendo el eje x
    return this.getAnalysis(x+1,0)
  }

  //Evaluación eje x
  private analysisX( x:number ,y:number, dataPosition:string, count:number):any{
    this.positionSequence.push(`${x}${y}`);
    this.sequence.push(dataPosition);
    //Evaluar condicion de limite en el eje y, ó si el valor de la posicion que se esta recorriendo es diferente con respecto a el valor actual
    if(y >= this.yLength || this.dnaMatrix[x][y] !== dataPosition){
      this.positionSequence=[];
      this.sequence = [];
      return false;
    }
    
    //Se encontro su totalidad de igualdad en la secuencia
    if(count == 3){
      return true;
    }

    //Recorer de nuevo aumentando el eje y de manera que pasa a la siguiente columna
    return this.analysisX(x, y + 1, dataPosition, count + 1)
  }

    //Evaluación eje y
  private analysisY(x:number ,y:number, dataPosition:string, count:number):any{    
    this.positionSequence.push(`${x}${y}`);
    this.sequence.push(dataPosition);
    //Evaluar condicion de limite en el eje x, ó si el valor de la posicion que se esta recorriendo es diferente con respecto a el valor actual
    if(x >= this.xLength || this.dnaMatrix[x][y] !== dataPosition){
      this.positionSequence=[];
      this.sequence = [];
      return false;
    }
    
     //Se encontro su totalidad de igualdad en la secuencia
    if(count == 3){
      return true;
    }

    //Recorer de nuevo aumentando el eje yxde manera que pasa a la siguiente fila
    return this.analysisY(x+1, y, dataPosition, count + 1)

  }

  //Evaluación de las dos diagonales
  private analysisXY(x: number, y:number, dataPosition:string, count:number, direction:string):any{
    this.positionSequence.push(`${x}${y}`);
    this.sequence.push(dataPosition);
    //Evaluar condicion de limite en el eje x, limite en el eje y, que el limite x no sea negativo , ó si el valor de la posicion que se esta recorriendo es diferente con respecto a el valor actual
    if (x >= this.xLength || y >= this.yLength || x < 0 || this.dnaMatrix[x][y] !== dataPosition) {
      this.positionSequence=[];
      this.sequence = [];
      return false;
    }

     //Se encontro su totalidad de igualdad en la secuencia
    if (count === 3) {
      return true;
    }
    
    //Recorer dependiendo la dirección de la diagonal
    if (direction === "diagonalOne") {
      return this.analysisXY(x + 1, y - 1, dataPosition, count + 1, "diagonalOne");
    } else {
      return this.analysisXY(x + 1, y + 1, dataPosition, count + 1, "diagonalTwo");
    }
  }


}
