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
    private boolean insul = false;
    private boolean reinforce = false;
    
    private int colours = 0;
    
    public Pipe(){}
    
    public Pipe(int g, double l, double oD, double iD, boolean cR, boolean i, boolean r, int c){
        grade = g;
        length = l;
        outDia = oD;
        inDia = iD;
        chemRes = cR;
        insul = i;
        reinforce = r;
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
    
    public boolean getInsul(){
        return insul;
    }
    
    public boolean getReinforce(){
        return reinforce;
    }
    
    public int getColours(){
        return colours;
    }
    
    // pretty getters
    
    public String getPrettyGrade(){
        return "Grade: " + getGrade();
    }
    
    public String getPrettyLength(){
        return getLength() + "m";
    }
    
    public String getPrettyDia(){
        return getOutDia() + "\"";
    }
    
    public String getPrettyChemRes(){
        return (getChemRes() ? "Chemical resistance - ":"");
    }    
    
    public String getPrettyInsul(){
        return (getInsul() ? "Insulation - ":"");
    }
    
    public String getPrettyReinforce(){
        return (getInsul() ? "Reinforcement - ":"");
    }
    
    public String getPrettyColours(){
        return getColours() + " colours";
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
    
    public void setInsul(boolean i){
        insul = i;
    }
    
    public void setReinforce(boolean r){
        reinforce = r;
    }
    
    public void setColours(int c){
        colours = c;
    }
    
    // other
    
    @Override
    public String toString(){
        
        String open = "";
        String close = "";
        
        if(getChemRes() || getInsul() || getReinforce()){
            open = " ( - ";
            close = ") ";
        }
        
        String a = "";
        
        String output = getPrettyGrade() + " | " + getPrettyLength() + " by "
                      + getPrettyDia() + " | " + open + getPrettyChemRes()
                      + getPrettyInsul() + getPrettyReinforce()
                      + close + " | " + getPrettyColours();
        return output;
    }
    
}
