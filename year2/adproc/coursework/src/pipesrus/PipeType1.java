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
        String output = (getChemRes() ? "CR":"No-CR");
        return  "<font color='#FF0000'>" + output + "</font>";
    }  
    
    // setters
    
    public void setChemRes(boolean chemRes){
        this.chemRes = chemRes;
    }

    // other
    
    @Override
    public String toString(){        
        return getPrettyLength() + " <i>by</i> " + getPrettyDia()
               + " | " + getPrettyGrade() + " (" + getPrettyChemRes() + ")";
    }
    
    // abstract overrides

    @Override
    public int getColours(){ return 0; }

    @Override
    public boolean getInsul(){ return false; }

    @Override
    public boolean getReinforce(){ return false; }
    
}
