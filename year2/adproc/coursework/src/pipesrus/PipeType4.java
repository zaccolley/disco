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
        String output = (getInsul() ? "I":"");
        return "<font color='#00FF00'>" + output + "</font>";
    }
    
    // setters
    
    public void setInsul(boolean insul){
        this.insul = insul;
    }

    // others
    
    @Override
    public String toString(){
        return getPrettyLength() + " <i>by</i> " + getPrettyDia()
               + " | " + getPrettyGrade() + " | " + getPrettyColours()
               + " (" + getPrettyChemRes() + ", " + getPrettyInsul() + ")";
    }
    
    
}
