package pipesrus;

public class PipeType23 extends PipeType1{
    
    private int colours = 0;
    
    public PipeType23(){}
    
    public PipeType23(int grade, double length, double dia, boolean chemRes, int colours){
        super(grade, length, dia, chemRes);
        
        if(colours >= 0 && colours <= 2){
            this.colours = colours;
        }else{ System.out.println("Colours broken"); }
    }
    
    // getters
    
    public int getColours(){
        return colours;
    }
    
    // pretty getters
    
    public String getPrettyColours(){
        return getColours() + " colours";
    }
    
    // setters
    
    public void setColours(int colours){
        this.colours = colours;
    }

    // others
    
    @Override
    public String toString(){        
        return getPrettyLength() + " by " + getPrettyDia()
               + " | " + getPrettyGrade() + " (" + getPrettyChemRes() + ")"
               + " | " + getPrettyColours();
    }
    
    
}
