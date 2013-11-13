package pipesrus;

public abstract class Pipe {
    
    private int grade = 1;
    
    private double length = 0.0;
    
    private double outDia = 0.0;
    private double inDia = 0.0;
    
    public Pipe(){}
    
    public Pipe(int grade, double length, double dia){
        
        if(grade >= 1 && grade <= 5){            
            this.grade = grade;
        }else{ System.out.println("[Pipe] Grade broken. Pick a grade from 1-5"); }
        
        if(length >= 0.0 && length <= 6.0){
            this.length = length;
        }else{ System.out.println("[Pipe] Length broken"); }
        
        if(dia >= 0.0){
            outDia = dia;
            inDia = dia * 0.9;
        }else{ System.out.println("[Pipe] Diameter broken"); }
        
    }
    
    // getters
    
    public int getGrade(){
        return grade;
    }
    
    public double getLength(){
        return length;
    }
    
    public double getLengthM(){
        return getLength();
    }
    
    public double getLengthIn(){
        return m2in(getLength());
    }
    
    public double getDia(){
        return outDia;
    }
    
    public double getOutDia(){
        return outDia;
    }
    
    public double getXAreaIn(){
        double outRadius = getOutDia() / 2;
        double inRadius = getInDia() / 2;
        
        double outXArea = outRadius * outRadius * Math.PI;
        double inXArea = inRadius * inRadius * Math.PI;
        
        return outXArea - inXArea;
    }
    
    public double getXAreaM(){
        return in2m(getXAreaIn());
    }
    
    public double in2m(double in){
        // 1" == 0.0254m
        double m = in * 0.0254;
        return m;
    }
    
    public double m2in(double m){
        // 1m == 39.37”
        double in = m * 39.37;
        return in;
    }
    
    public double getInDia(){
        return inDia;
    }
    
    public abstract boolean getChemRes();
    
    public abstract int getColours();
    
    public abstract boolean getInsul();
    
    public abstract boolean getReinforce();
    
    // pretty getters
    
    public String getPrettyGrade(){
        return "Grade: <b>" + getGrade() + "</b>";
    }
    
    public String getPrettyLength(){
        return "<b>" + getLength() + "</b>m";
    }
    
    public String getPrettyDia(){
        return "<b>" + getOutDia() + "\"</b>";
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
    
    // other
    
    @Override
    public String toString(){        
        return getPrettyLength() + " <i>by</i> " + getPrettyDia()
               + " | " + getPrettyGrade();
    }
    
}
