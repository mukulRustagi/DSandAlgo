public class DynamicArrayUse{
    public static void main(String []args){
        DynamicArray d = new DynamicArray();

        for(int i=0;i<100;i++){
            d.add(i+10);
        }
        System.out.print(d.size());
        d.set(4,10);
        System.out.print(d.get(3));
        System.out.print(d.get(4));

        while(!d.isEmpty()){
            System.out.print(d.removeLast());
            System.out.print("size "+d.size());
        }
    }
    
}
