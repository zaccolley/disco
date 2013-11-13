package pipesrus;

public class PipeType1 extends Pipe{
  
    private boolean chemRes = false;
    
    public PipeType1(){}
    
    public PipeType1(int grade, double length, double dia, boolean chemRes){
        super(grade, length, dia);
        
        this.chemRes = chemRes;
    }
    
    // getters    
    
    public boolean getChemRes(){
        return chemRes;
    }
    
    // pretty getters
    
    public String getPrettyChemRes(){
        return (getChemRes() ? "CR":"");
    }  
    
    // setters
    
    public void setChemRes(boolean chemRes){
        this.chemRes = chemRes;
    }

    // other
    
    @Override
    public String toString(){        
        return getPrettyLength() + " by " + getPrettyDia()
               + " | " + getPrettyGrade() + " (" + getPrettyChemRes() + ")";
    }
    
}
