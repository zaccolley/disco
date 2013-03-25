import java.lang.Character;

public class Registration
{
    String reg;
   
    public Registration(String reg){
        
        boolean valid = true;
        
        if (reg.length() == 7){            
            int i = 0;            
            while(valid && i < 7){
                if ( !(i == 2 || i == 3 || i == 4) ){
                    if( !Character.isUpperCase(reg.charAt(i)) ){
                        valid = false;
                    }
                }else{
                    if( !Character.isDigit(reg.charAt(i)) ){
                        valid = false;
                    }
                }
                i++;
            } 
            
            if (valid){
                this.reg = reg;
            }
            
            }             
        }
        
        public String getReg(){
            return reg;
        }
        
        public void setReg(String reg){
            boolean valid = true;
        
        if (reg.length() == 7){            
            int i = 0;            
            while(valid && i < 7){
                if ( !(i == 2 || i == 3 || i == 4) ){
                    if( !Character.isUpperCase(reg.charAt(i)) ){
                        valid = false;
                    }
                }else{
                    if( !Character.isDigit(reg.charAt(i)) ){
                        valid = false;
                    }
                }
                i++;
            } 
            
            if (valid){
                this.reg = reg;
            }
            
            } 
        }
}


