// import connectionToDatabase from "@/lib/mongoose";
// import User from "@/models/User";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";





import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectionToDatabase();
        const { action, name, email, password } = await request.json();

        if (action === 'register') {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            const token = jwt.sign(
                { userId: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const userResponse = {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: token
            };

            return NextResponse.json(userResponse, { status: 201 });

        } else if (action === 'login') {
       
            const user = await User.findOne({ email });

            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token
            };

            return NextResponse.json(userResponse, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

































// export async function POST(request) {


//     try {
//         await connectionToDatabase()
//         const { name, email, password } = await request.json();

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();
//         const token = jwt.sign(
//           { userId: newUser._id },
//           process.env.JWT_SECRET, // Make sure to set this in your environment variables
//           { expiresIn: '1h' } // Token expires in 1 hour
//       );
//       const userResponse = {
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         token: token
//     };

//     return NextResponse.json(userResponse, { status: 201 });
        
//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//     };
// }


















