package pipesrus;

import java.lang.Math;

/**
 *
 * @author Zac Colley
 */
public class Pipe {
    
    private int grade = 1;
    
    private double length = 0.0;
    
    private double outDia = 0.0;
    private double inDia = 0.0;
    
    private boolean chemRes = false;
    private boolean insul = false;
    private boolean reinforce = false;
    
    private int colours = 0;
    
    public Pipe(){}
    
    public Pipe(int g, double l, double d, boolean cR, boolean i, boolean r, int c){
        
        if(g >= 1 && g <= 5){            
            grade = g;
        }else{ System.out.println("Grade broken. Pick a grade from 1-5"); }
        
        if(l >= 0.0 && l <= 6.0){
            length = l;
        }else{ System.out.println("Length broken"); }
        
        if(d >= 0.0){
            outDia = d;
            inDia = d * 0.9;
        }else{ System.out.println("Diameter broken"); }
                
        chemRes = cR;
        insul = i;
        reinforce = r;
        
        if(c >= 0 && c <= 2){
            colours = c;
        }else{ System.out.println("Colours broken"); }
    }
    
    // getters
    
    public int getGrade(){
        return grade;
    }
    
    public double getLength(){
        return length;
    }
    
    public double getDia(){
        return outDia;
    }
    
    public double getOutDia(){
        return outDia;
    }
    
    public double getXAreaIn(){
        double outXArea = getOutDia() * Math.PI;
        double inXArea = getInDia() * Math.PI;
        return outXArea - inXArea;
    }
    
    public double getXAreaM(){
        return m2in(getXAreaIn());
    }
    
    public double m2in(double m){
        // 1m == 39.37”
        double in = m * 39.37;
        return in;
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
        return (getChemRes() ? "CR - ":"");
    }    
    
    public String getPrettyInsul(){
        return (getInsul() ? "I - ":"");
    }
    
    public String getPrettyReinforce(){
        return (getReinforce() ? "R - ":"");
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
    
    public void setDia(double d){
        setOutDia(d);
        setInDia(d * 0.9);
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
        
        String colourString = "";
        
        if(getColours() > 0){
            colourString = " | " + getPrettyColours();
        }
        
        String output = getPrettyLength() + " by "
                      + getPrettyDia() + open + getPrettyChemRes()
                      + getPrettyInsul() + getPrettyReinforce()
                      + close + " | " + getPrettyGrade() + colourString;
        return output;
    }
    
}
