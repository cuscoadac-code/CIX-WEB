import fs from 'fs';

let content = fs.readFileSync('./src/App.tsx', 'utf8');

// 1. Imports
content = content.replace(
  `import { auth, db, signInWithGoogle, logout } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  Timestamp,
  doc,
  setDoc
} from 'firebase/firestore';`,
  `import { supabase } from './supabase';
import { User as FirebaseUser } from '@supabase/supabase-js';

const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({ provider: 'google' });
};

const logout = async () => {
  await supabase.auth.signOut();
};`
);

// 2. handleFirestoreError
content = content.replace(
  /enum OperationType {[\s\S]*?} catch \(error\) \{/m,
  `function handleFirestoreError(error: unknown) {
  console.error("Supabase Error:", error);
  toast.error("Error en base de datos. Verifica RLS.");
}

// --- COMPONENTS ---`
);
// Actually the previous regex is risky, let's do exact block.
content = content.replace(
  `enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  toast.error("Error de permisos en Firestore. Verifica las reglas de seguridad.");
  throw new Error(JSON.stringify(errInfo));
}`,
`// --- ERROR HANDLER ---
function handleFirestoreError(error: unknown) {
  console.error('Supabase Error: ', error);
}`);

// 3. Navbar user properties
content = content.replace(`src={user.photoURL || ''}`, `src={user.user_metadata?.avatar_url || ''}`);
content = content.replace(`alt={user.displayName || ''}`, `alt={user.user_metadata?.full_name || ''}`);
content = content.replace(`{user.displayName}`, `{user.user_metadata?.full_name}`);

// 4. PaymentModal Insert
content = content.replace(
`      await addDoc(collection(db, \`users/\${user.uid}/enrollments\`), {
        courseId: course.id,
        courseTitle: course.title,
        amount: course.price,
        timestamp: serverTimestamp(),
        status: 'completed'
      });`,
`      await supabase.from('enrollments').insert({
        user_id: user.id,
        course_id: course.id,
        course_title: course.title,
        amount: course.price,
        status: 'completed'
      });`
);

// 5. Chatbot UseEffect
content = content.replace(
`      const q = query(
        collection(db, \`users/\${user.uid}/chats\`),
        orderBy('timestamp', 'asc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, \`users/\${user.uid}/chats\`);
      });
      return () => unsubscribe();`,
`      const fetchMessages = async () => {
        const { data } = await supabase.from('chats').select('*').eq('user_id', user.id).order('created_at', { ascending: true });
        if (data) setMessages(data);
      };
      fetchMessages();
      const channel = supabase.channel('chats-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'chats', filter: \`user_id=eq.\${user.id}\` }, () => fetchMessages()).subscribe();
      return () => { supabase.removeChannel(channel); };`
);

// Timestamp in Chatbot display
content = content.replace(
  `{m.timestamp instanceof Timestamp ? m.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}`,
  `{m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}`
);


// 6. Chatbot Save User
content = content.replace(
`      // Save user message to Firestore
      await addDoc(collection(db, \`users/\${user.uid}/chats\`), {
        uid: user.uid,
        role: 'user',
        text: userMsg,
        timestamp: serverTimestamp()
      });`,
`      // Save user message to Supabase
      await supabase.from('chats').insert({
        user_id: user.id,
        role: 'user',
        text: userMsg
      });`
);

// 7. Chatbot Save Model
content = content.replace(
`      // Save AI response to Firestore
      await addDoc(collection(db, \`users/\${user.uid}/chats\`), {
        uid: user.uid,
        role: 'model',
        text: aiResponse,
        timestamp: serverTimestamp()
      });`,
`      // Save AI response to Supabase
      await supabase.from('chats').insert({
        user_id: user.id,
        role: 'model',
        text: aiResponse
      });`
);

// 8. Image Generator UseEffect
content = content.replace(
`      const q = query(
        collection(db, \`users/\${user.uid}/images\`),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setGeneratedImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, \`users/\${user.uid}/images\`);
      });
      return () => unsubscribe();`,
`      const fetchImages = async () => {
        const { data } = await supabase.from('images').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (data) setGeneratedImages(data);
      };
      fetchImages();
      const channel = supabase.channel('images-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'images', filter: \`user_id=eq.\${user.id}\` }, () => fetchImages()).subscribe();
      return () => { supabase.removeChannel(channel); };`
);

// 9. Image Generator Save
content = content.replace(
`        await addDoc(collection(db, \`users/\${user.uid}/images\`), {
          uid: user.uid,
          prompt,
          imageUrl,
          timestamp: serverTimestamp()
        });`,
`        await supabase.from('images').insert({
          user_id: user.id,
          prompt,
          imageUrl: imageUrl
        });`
);

// 10. TalentForm Save
content = content.replace(
`      await addDoc(collection(db, 'talent_applications'), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        ...formData,
        timestamp: serverTimestamp()
      });`,
`      await supabase.from('talent_applications').insert({
        user_id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name,
        ...formData
      });`
);

// 11. App Auth UseEffect
content = content.replace(
`    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthReady(true);
      if (u) {
        // Sync user profile to Firestore
        setDoc(doc(db, 'users', u.uid), {
          uid: u.uid,
          displayName: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
          createdAt: serverTimestamp()
        }, { merge: true }).catch(err => handleFirestoreError(err, OperationType.WRITE, \`users/\${u.uid}\`));
      }
    });
    return () => unsubscribe();`,
`    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        supabase.from('users').upsert({
          id: u.id,
          display_name: u.user_metadata?.full_name,
          email: u.email,
          photo_url: u.user_metadata?.avatar_url
        }).then(({error}) => { if(error) console.error(error) });
      }
    });

    return () => subscription.unsubscribe();`
);

fs.writeFileSync('./src/App.tsx', content, 'utf8');
console.log("Migration complete!");
