package pipesrus;

public class PipeType5 extends PipeType4{    
    
    private boolean reinforce = false;
    
    public PipeType5(){}
    
    public PipeType5(int grade, double length, double dia, boolean chemRes, boolean insul, boolean reinforce, int colours){
        super(grade, length, dia, chemRes, insul, colours);
        
        this.reinforce = reinforce;
    }
    
    // getters
    
    public boolean getReinforce(){
        return reinforce;
    }
    
    // pretty getters 
    
    public String getPrettyReinforce(){
        String output = (getReinforce() ? "R":"");
        return "<font color='#0000FF'>" + output +"</font>";
    }
    
    // setters
    
    public void setReinforce(boolean reinforce){
        this.reinforce = reinforce;
    }

    // others
    
    @Override
    public String toString(){
        return getPrettyLength() + " <i>by</i> " + getPrettyDia()
               + " | " + getPrettyGrade()  + " | " + getPrettyColours()
               + " (" + getPrettyChemRes() + ", "
               + getPrettyInsul() + ", " + getPrettyReinforce() + ")";
    }
    
    
}
