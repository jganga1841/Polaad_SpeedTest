import { Component } from '@angular/core';
@Component({
    selector: 'app-error-message',
    templateUrl: 'app/error/errorMessage.html',
})
export class ErrorMessage
{
    private ErrorMsg: string;
    private MsgHeader : string;
    public isConfirmed : boolean = false;
    public ErrorMessageIsVisible: boolean;

    public dialogConfirmation: () => void;
    public dialogRejection: () => void;

    showErrorMessage (msg: string, header: string) //:Promise<boolean>
    {
        this.ErrorMsg = msg;
        this.MsgHeader = header;
        this.ErrorMessageIsVisible = true;
        //  return new Promise<boolean>((resolve, reject) =>{
        //      this.dialogConfirmation = () => resolve(true);
        //     this.dialogRejection = () => resolve(false);
        //  })
    }
     confirm() {
         this.isConfirmed= true;
    this.dialogConfirmation()
  }
  reject() {
    this.dialogRejection();
  }
    hideErrorMsg()
    {
        this.isConfirmed = true;    
        this.ErrorMessageIsVisible = false;
    }
}

