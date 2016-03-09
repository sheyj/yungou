import com.alibaba.dubbo.container.Main;

public class Provider {

	public static void main(String[] args) throws Exception {
		Main.main(args);
		System.in.read(); // 为保证服务一直开着，利用输入流的阻塞来模拟
	}

}
