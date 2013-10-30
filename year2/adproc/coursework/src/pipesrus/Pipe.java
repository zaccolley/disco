package pipesrus;

/**
 *
 * @author Zac Colley
 */
public class Pipe {
    
    private int grade = 0;
    
    private double length = 0.0;
    
    private double outDia = 0.0;
    private double inDia = 0.0;
    
    private boolean chemRes = false;
    
    private int colours = 0;
    
    public Pipe(){}
    
    public Pipe(int g, double l, double oD, double iD, boolean cR, int c){
        grade = g;
        length = l;
        outDia = oD;
        inDia = iD;
        chemRes = cR;
        colours = c;
    }
    
    // getters
    
    public int getGrade(){
        return grade;
    }
    
    public double getLength(){
        return length;
    }
    
    public double getOutDia(){
        return outDia;
    }
    
    public double getInDia(){
        return inDia;
    }
    
    public boolean getChemRes(){
        return chemRes;
    }
    
    public int getColours(){
        return colours;
    }
    
    // pretty getters
    
    public String getPrettyGrade(){
        return "Grade: " + getGrade();
    }
    
    public String getPrettyLength(){
        return "Length: "+ getLength() + " meters";
    }
    
    public String getPrettyDia(){
        return "Diameter: " + getOutDia() + " inches";
    }
    
    public String getPrettyChemRes(){
        return "Chemical Resistance: " + (getChemRes() ? "Yes":"No");
    }
    
    public String getPrettyColours(){
        return "Colours: " + getColours();
    }
    
    // setters
    
    public void setGrade(int g){
        grade = g;
    }
    
    public void setLength(double l){
        length = l;
    }
    
    public void setOutDia(double oD){
        outDia = oD;
    }
    
    public void setInDia(double iD){
        inDia = iD;
    }
    
    public void setChemRes(boolean cR){
        chemRes = cR;
    }
    
    public void setColours(int c){
        colours = c;
    }
    
    // other
    
    @Override
    public String toString(){
        
        String output = getPrettyGrade() + "\n" + getPrettyLength() + "\n"
                      + getPrettyDia() + "\n" + getPrettyChemRes()
                      + "\n" + getPrettyColours();
        return output;
    }
    
}
