<?php

namespace AppBundle\Controller;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;
use AppBundle\Entity\User;
use AppBundle\Entity\Product;
use AppBundle\Entity\Group;
use AppBundle\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\ORM\Query\ResultSetMappingBuilder;

class UsersController extends FOSRestController implements ClassResourceInterface
{
    public function cgetAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        if ($request->query->get('object')=='user') {
            $em = $this->getDoctrine()->getEntityManager();
            $repository = $em->getRepository("AppBundle:User");
            $users = $repository->findAll();


            $userId=$this->get('security.token_storage')->getToken()->getUser()->getId();
            $user = $this->getDoctrine()
        ->getRepository('AppBundle:User')
        ->find($userId);
            $products=$user->getProducts();
            $jsonproducts=[];

            foreach ($products as $p) {
                $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId()];
            }
            echo json_encode($jsonproducts);

            exit;
        } else {
            echo json_encode(['error'=>'unknown object']);
            exit;
        }
        $view = $this->view($users, 200)
            ->setTemplate("default/users.html.twig")
            ->setTemplateVar('users')
        ;


        return $this->handleView($view);
    }
    public function loginAction(Request $request)
    {
        $name= $request->query->get('name');
        $password= $request->query->get('password');
        $opts = array(
  'http' => array('ignore_errors' => true)
);
        $context = stream_context_create($opts);
        $xml = file_get_contents("http://127.0.0.1/api4/web/app_dev.php/oauth/v2/token?client_id=2_t2n7w4jlr28w80wo84gook880cck4ccc4ws4ko0k04w00kgk4&client_secret=2ghw09zkf280gggsg8s48sc0owk4gsg48cwgcsgg84gkokw0cc&grant_type=password&username=".$name."&password=".$password, false, $context);
        if (!property_exists(json_decode($xml), 'error')) {
            echo json_encode(
       ['token'=>(json_decode($xml)->access_token)]);
            setcookie("httponlyrefresh", json_decode($xml)->refresh_token, null, null, null, null, true);

            exit;
        } else {
            throw $this->createAccessDeniedException();
            echo $xml;
            exit;
        }
       //store refresh token in httponly cookie
        echo  $this->client->getPublicId();
        exit;
    }
    public function logoutAction(Request $request)
    {
        setcookie("httponlyrefresh", '', null, null, null, null, true);
        exit;
    }
    public function refreshAction()
    {
        $opts = array(
  'http' => array('ignore_errors' => true)
);

        $context = stream_context_create($opts);
        if (array_key_exists("httponlyrefresh", $_COOKIE)) {
            $xml = file_get_contents("http://127.0.0.1/api4/web/app_dev.php/oauth/v2/token?grant_type=refresh_token&client_id=2_t2n7w4jlr28w80wo84gook880cck4ccc4ws4ko0k04w00kgk4&client_secret=2ghw09zkf280gggsg8s48sc0owk4gsg48cwgcsgg84gkokw0cc&refresh_token=".$_COOKIE["httponlyrefresh"], false, $context);
        } else {
            exit;
        }
        if (!property_exists(json_decode($xml), 'error')) {
            echo json_encode((json_decode($xml)->access_token));
            setcookie("httponlyrefresh", json_decode($xml)->refresh_token, null, null, null, null, true);
            exit;
        } else {
            echo $xml;
            exit;
        }
        echo  $this->client->getPublicId();
        exit;
    }

    public function userAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $locationrepo = $em->getRepository("AppBundle:Location");

        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $producer=$locationrepo->findOneBy(array('type'=>'Primary','user'=>$user->getId()));

        $locations = $user->getLocations();
        foreach ($locations as $l) {
            $sublocs=$l->getLocations();
        //  echo $sublocs;exit;
          foreach ($sublocs as $sl) {
              $jsonsublocs[]=["name"=> $sl->getName(),"id"=>$sl->getId(),"description"=>$sl->getDescription(),'type'=>$sl->getType()];
          }
            if (count($sublocs)==0) {
                $jsonsublocs=[];
            }
            $jsonlocations[]=["name"=> $l->getName(),"id"=>$l->getId(),"description"=>$l->getDescription(),'type'=>$l->getType(),'sublocs'=>$jsonsublocs];
        }
        exit;
    }
        //$p=$repository->findOneById($ProductId);
        public function initializeAction(Request $request)
        {
            if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
                throw $this->createAccessDeniedException();
            }
            $em = $this->getDoctrine()->getEntityManager();
            $repository = $em->getRepository("AppBundle:User");
            $locationrepo = $em->getRepository("AppBundle:Location");
            $ptyperepo = $em->getRepository("AppBundle:Producttype");
            $user =  $this->get('security.token_storage')->getToken()->getUser();
            $producer=$locationrepo->findOneBy(array('type'=>'Primary','user'=>$user->getId()));
            $ptypes=$ptyperepo->findAll();
            $jsonptypes=[];
            foreach ($ptypes as $ptp) {

                    $jsonptypes[]=["id"=>$ptp->getId(),"name"=> $ptp->getName(),"imgurl"=>$ptp->getImageurl()];

            }
          //  $locations = $user->getLocations();
           $locations=$locationrepo->findAll();
            foreach ($locations as $l) {
                $sublocs=$l->getLocations();
            //  echo $sublocs;exit;
              foreach ($sublocs as $sl) {
                  $jsonsublocs[]=["name"=> $sl->getName(),"id"=>$sl->getId(),"userid"=>$l->getUser()->getId(),"description"=>$sl->getDescription(),"address"=>$sl->getAddress(),"lat"=>$sl->getLat(),"lng"=>$sl->getLng(),'imgurl'=>$sl->getImgUrl(),'type'=>$sl->getType()];
              }
                if (count($sublocs)==0) {
                    $jsonsublocs=[];
                }
                $jsonlocations[]=["name"=> $l->getName(),"id"=>$l->getId(),"userid"=>$l->getUser()->getId(),"description"=>$l->getDescription(),"address"=>$l->getAddress(),"lat"=>$l->getLat(),"lng"=>$l->getLng(),'imgurl'=>$l->getImgUrl(),'type'=>$l->getType(),'sublocs'=>$jsonsublocs];
            }
            $jsondlocs=[];
            $dlocations=$user->getDlocations();
            foreach($dlocations as $dl){
              $jsondlocs[]=["id"=>$dl->getId()];

            }
            //$p=$repository->findOneById($ProductId);
            $products = $user->getProducts();
            foreach ($products as $p) {
                $groupsjson=[];
                $grs=$p->getGroups();
                foreach ($grs as $g) {
                    $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
                }
                $locationsjson=[];
                $ls=$p->getLocations();
                foreach ($ls as $l) {
                    $locationsjson[]=['name'=>$l->getName(),'id'=>$l->getId(),'type'=>$l->getType()];
                }
                if ($p->getProducttype()!=null) {
                    $ptype=$p->getProducttype()->getId();
                } else {
                    $ptype=null;
                }
                $jsonproducts[]=$p->toJson();
            }


            if (count($locations)==0) {
                $jsonlocations=[];
            }

            if (count($products)==0) {
                $jsonproducts=[];
            }
            echo json_encode(['name'=>$user->getUserName(),"userId"=>$user->getId(),'email'=>$user->getEmail(),'locations'=>$jsonlocations,'dlocs'=>$jsondlocs,'products'=>$jsonproducts,'producttypes'=>$jsonptypes]);
            exit;
        }

    public function apiAction(Request $request)
    {
        exit;

        $name= $request->query->get('name');
        $password= $request->query->get('password');

        $xml = file_get_contents("http://127.0.0.1/api4/web/app_dev.php/oauth/v2/token?client_id=1_1w4njs4ftwo0osccg08cswc4oc80wgc4kkksg8480o4c0g4c00&client_secret=3ohpora85s4k8oswco088o04s44k0kss8w0cskks4wk40gw4w8&grant_type=password&username=".$name."&password=".$password);
        var_dump($xml);
        exit;
        echo  $this->client->getPublicId();
        exit;
    }
    public function addlocationuserAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $locationId=$request->query->get('Id');
        $em = $this->getDoctrine()->getEntityManager();
        $user=$this->get('security.token_storage')->getToken()->getUser();
        $locationrepo = $em->getRepository("AppBundle:Location");

        $location=$locationrepo->findOneById($locationId);
        $user->addDlocation($location);
        $location->addUserd($user);
        $em->persist($user);
        $em->persist($location);
        $em->flush();

        echo json_encode(["id"=>$locationId]);
        exit;
    }
    public function removelocationuserAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $locationId=$request->query->get('Id');
        $em = $this->getDoctrine()->getEntityManager();
        $user=$this->get('security.token_storage')->getToken()->getUser();
        $locationrepo = $em->getRepository("AppBundle:Location");

        $location=$locationrepo->findOneById($locationId);
        $user->removeDlocation($location);
        $location->removeUserd($user);
        $em->persist($user);
        $em->persist($location);
        $em->flush();

        echo json_encode(["id"=>$locationId]);
        exit;
    }
    public function initializepublicAction(Request $request)
    {
        $locationId=$request->query->get('id');
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:Product");
        $locationrepo = $em->getRepository("AppBundle:Location");
        $ptyperepo = $em->getRepository("AppBundle:Producttype");


        $ptypes=$ptyperepo->findAll();
        $jsonptypes=[];
        foreach ($ptypes as $ptp) {
            $jsonptypes[]=["id"=>$ptp->getId(),"name"=> $ptp->getName(),"imgurl"=>$ptp->getImageurl()];
        }
        $locations = $locationrepo->findAll();

        //$p=$repository->findOneById($ProductId);
        //$repository = $em->getRepository("AppBundle:product");
       //$user =  $this->get('security.token_storage')->getToken()->getUser();

       $inLat=$request->query->get('lat');
        $inLng=$request->query->get('lng');
        $rsm = new ResultSetMappingBuilder($em);
        $rsm->addRootEntityFromClassMetadata('AppBundle\Entity\Product', 'u');
        $rsm->addFieldResult('u', 'name', 'name');
        $rsm->addFieldResult('u', 'subTitle', 'subTitle');
        $rsm->addFieldResult('u', 'description', 'description');
        $rsm->addFieldResult('u', 'id', 'id');
        $rsm->addFieldResult('u', 'price', 'price');
        $rsm->addFieldResult('u', 'priceType', 'priceType');
        $rsm->addFieldResult('u', 'imgUrl', 'imgUrl');
        $rsm->addFieldResult('u', 'useCustomImage', 'useCustomImage');
        $rsm->addMetaResult('u', 'highLighted', 'highLighted');
        $rsm->addMetaResult('u', 'lat', 'lat');
        $rsm->addMetaResult('u', 'lng', 'lng');
        $rsm->addFieldResult('u', 'groups', 'groups');
        $rsm->addFieldResult('u', 'locations', 'locations');
        $rsm->addMetaResult('u', 'producttype', 'producttype');
     //.  $
     //  $rsm->addFieldResult('u', 'lng', 'lng');
       $rsm->addFieldResult('u', 'distance', 'distance');
        $query = $em->createNativeQuery('SELECT  e.*,l.lat,l.lng,( 6371 * acos( cos( radians('.$inLat.') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('.$inLng.') ) + sin( radians('.$inLat.') ) * sin( radians( lat ) ) ) ) as distance FROM productslocations d INNER JOIN products e ON e.id = d.plID
       INNER JOIN location l ON l.id = d.jid
       ORDER BY distance', $rsm);
        $products= $query->getResult();
        $jsonproducts=[];
      //  foreach ($products as $p) {var_dump($p->getDistance());};exit;
        foreach ($products as $p) {
            $jsonproducts[]=$p->toJson();
        }
        foreach ($locations as $l) {
            $sublocs=$l->getLocations();
            $prods=$l->getProducts();
            $jsonprods1=[];
            foreach ($prods as $prd) {
                $jsonprods1[]=["id"=>$prd->getId()];
            }
        //  echo $sublocs;exit;
          foreach ($sublocs as $sl) {
              $prods=$sl->getProducts();
              $jsonprodssub=[];
              foreach ($prods as $prd) {
                  $jsonprodssub[]=["id"=>$prd->getId()];
              }
              $jsonsublocs[]=["name"=> $sl->getName(),"id"=>$sl->getId(),"description"=>$sl->getDescription(),"address"=>$sl->getAddress(),"lat"=>$sl->getLat(),"lng"=>$sl->getLng(),'url'=>$sl->getUrl(),'type'=>$sl->getType(),'products'=>$jsonprodssub];
          }
            if (count($sublocs)==0) {
                $jsonsublocs=[];
            }
            $jsonlocations[]=["name"=> $l->getName(),"id"=>$l->getId(),"description"=>$l->getDescription(),"address"=>$l->getAddress(),"lat"=>$l->getLat(),"lng"=>$l->getLng(),'url'=>$l->getUrl(),'type'=>$l->getType(),'sublocs'=>$jsonsublocs,'products'=>$jsonprods1];
        }

        if (count($locations)==0) {
            $jsonlocations=[];
        }

        if (count($products)==0) {
            $jsonproducts=[];
        }
        echo json_encode(['locations'=>$jsonlocations,'products'=>$jsonproducts,'producttypes'=>$jsonptypes]);
        exit;
    }

    public function postAction(Request $request)
    {
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->createUser();
        $user->setEnabled(true);

        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $user->setPlainPassword($user->getPassword());
            $userManager->updateUser($user);

            $view = $this->view($user, 200);
            return $this->handleView($view);
        }

        $view = $this->view($form->getErrors(), 409);
        return $this->handleView($view);
    }
}
