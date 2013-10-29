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
        this.grade = g;
        this.length = l;
        this.outDia = oD;
        this.inDia = iD;
        this.chemRes = cR;
        this.colours = c;
    }
    
}
