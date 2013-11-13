package pipesrus;

public class PipeType4 extends PipeType23{
   
    private boolean insul = false;
    
    public PipeType4(){}
    
    public PipeType4(int grade, double length, double dia, boolean chemRes, boolean insul, int colours){
        super(grade, length, dia, chemRes, colours);
        
        this.insul = insul;
    }
    
    // getters
    
    public boolean getInsul(){
        return insul;
    }
    
    // pretty getters 
    
    public String getPrettyInsul(){
        return (getInsul() ? "I":"");
    }
    
    // setters
    
    public void setInsul(boolean insul){
        this.insul = insul;
    }

    // others
    
    @Override
    public String toString(){        
        return getPrettyLength() + " by " + getPrettyDia()
               + " | " + getPrettyGrade() + " (" + getPrettyChemRes() + ", "
               + getPrettyInsul() + ")"
               + " | " + getPrettyColours();
    }
    
    
}
